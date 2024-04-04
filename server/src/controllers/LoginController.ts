import { Request, Response } from "express";
import { controller, get, post, requestSchema } from "../decorators";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { UserModel } from "../models";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import dayjs from "dayjs";
import { userRepository } from "../repositories";

dotenv.config();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

const signupSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(3),
  email: z.string().email(),
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  role: z.enum(["admin", "writer"]).default("writer"),
});

@controller("auth")
class LoginController {
  @post("/login")
  @requestSchema(loginSchema)
  async postLogin(req: Request, res: Response) {
    try {
      const { password, email }: z.infer<typeof loginSchema> = req.body;
      const user = await userRepository.findOne({ email });
      if (!user)
        return res
          .status(401)
          .json({ message: "Email or password does not match!" });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res
          .status(401)
          .json({ message: "Email or password does not match!" });
      const jwtToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.SECRETKEY as string,
      );
      return res
        .cookie("api-auth", jwtToken, {
          secure: false,
          httpOnly: true,
          expires: dayjs().add(7, "days").toDate(),
        })
        .json({ message: "welcome back!", user });
    } catch (err) {
      console.log("login error", err);
      res.status(500).json({ message: "Cannot login at this moment!" });
    }
  }

  @post("/logout")
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.clearCookie("api-auth").json({ message: "good bye!" });
  }

  @post("/signup")
  @requestSchema(signupSchema)
  async postSignup(req: Request, res: Response) {
    try {
      const {
        username,
        password,
        email,
        firstName,
        lastName,
        role,
      }: z.infer<typeof signupSchema> = req.body;
      const existingUser = await userRepository.findOne({ email });
      if (existingUser)
        return res
          .status(409)
          .json({ message: "User with email already exists!" });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({
        username,
        email,
        firstName,
        lastName,
        role,
        password: hashedPassword,
      });

      await userRepository.create(newUser);
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.log("Signup error", err);
      res.status(500).json({ message: "Cannot register user at this moment!" });
    }
  }
}
