"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
var appRouter_1 = require("../appRouter");
var MetadataKeys_1 = require("./MetadataKeys");
var passport_1 = __importDefault(require("passport"));
require("../utils/passport-config");
function generateValidationMiddleware(metadataKey, target, key, validationFunction) {
    return function (req, res, next) {
        var metadata = Reflect.getMetadata(metadataKey, target.prototype, key);
        metadata ? validationFunction(metadata)(req, res, next) : next();
    };
}
function schemaValidator(schema) {
    return function (req, res, next) {
        var requestSchema = schema.safeParse(req.body);
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
function controller(rootePrefix) {
    return function (target) {
        var router = appRouter_1.AppRouter.getInstance();
        for (var key in target.prototype) {
            var routerHandler = target.prototype[key];
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            var validateRequestSchema = generateValidationMiddleware(MetadataKeys_1.MetadataKeys.schema, target, key, schemaValidator);
            var authenticate = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.auth, target.prototype, key)
                ? passport_1.default.authenticate("jwt", { session: false })
                : function (req, res, next) { return next(); };
            if (path)
                router[method].apply(router, __spreadArray(__spreadArray(["/api/v1/".concat(rootePrefix).concat(path)], middlewares, false), [validateRequestSchema,
                    authenticate,
                    routerHandler], false));
        }
    };
}
exports.controller = controller;
