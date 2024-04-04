import { NextFunction, Request, Response } from "express";
import { auth, controller, get, use } from "../decorators";

const middleware = (req: Request, res: Response, next: NextFunction) => {
  next();
};

@controller("home")
class RootController {
  @get("/")
  @auth()
  async getRoot(req: Request, res: Response) {
    res.send(`
      <div>
        <p>You are not logged in</p>
        <a  href='/auth/login'>Login</a>
      </div>
    `);
  }

  @get("/protected")
  getProtected(req: Request, res: Response) {
    res.send("Welcome to protected route, logged in user.");
  }
}
