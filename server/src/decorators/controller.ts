import "reflect-metadata";
import { AppRouter } from "../appRouter";
import { MetadataKeys } from "./MetadataKeys";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { z } from "zod";
import { Methods } from "./Methods";
import passport from "passport";
import "../utils/passport-config";

function generateValidationMiddleware(
  metadataKey: string,
  target: any,
  key: string,
  validationFunction: Function,
) {
  return function (req: Request, res: Response, next: NextFunction) {
    const metadata = Reflect.getMetadata(metadataKey, target.prototype, key);
    metadata ? validationFunction(metadata)(req, res, next) : next();
  };
}

function schemaValidator(schema: z.Schema): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction) {
    const requestSchema = schema.safeParse(req.body);
    if (!requestSchema.success)
      return res.status(422).send(requestSchema.error.toString());
    next();
  };
}

// function validateAuth() {
//   return function (req: Request, res: Response, next: NextFunction) {
//     if (req.session && req.session.userId) return next();
//     res.status(403).send("Not permitted");
//   };
// }

export function controller(rootePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();
    for (let key in target.prototype) {
      const routerHandler = target.prototype[key];
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key,
      );
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key,
      );
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      const validateRequestSchema = generateValidationMiddleware(
        MetadataKeys.schema,
        target,
        key,
        schemaValidator,
      );
      const authenticate = Reflect.getMetadata(
        MetadataKeys.auth,
        target.prototype,
        key,
      )
        ? passport.authenticate("jwt", { session: false })
        : (req: Request, res: Response, next: NextFunction) => next();

      if (path)
        router[method](
          `/api/v1/${rootePrefix}${path}`,
          ...middlewares,
          validateRequestSchema,
          authenticate,
          routerHandler,
        );
    }
  };
}
