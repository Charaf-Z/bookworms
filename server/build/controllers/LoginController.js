"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../decorators");
var zod_1 = require("zod");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var models_1 = require("../models");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
var dayjs_1 = __importDefault(require("dayjs"));
var repositories_1 = require("../repositories");
dotenv_1.default.config();
var loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(3),
});
var signupSchema = zod_1.z.object({
    username: zod_1.z.string().min(4),
    password: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    firstName: zod_1.z.string().min(3),
    lastName: zod_1.z.string().min(3),
    role: zod_1.z.enum(["admin", "writer"]).default("writer"),
});
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController.prototype.postLogin = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password, email, user, isPasswordValid, jwtToken, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, password = _a.password, email = _a.email;
                        return [4 /*yield*/, repositories_1.userRepository.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        if (!user)
                            return [2 /*return*/, res
                                    .status(401)
                                    .json({ message: "Email or password does not match!" })];
                        return [4 /*yield*/, bcryptjs_1.default.compare(password, user.password)];
                    case 2:
                        isPasswordValid = _b.sent();
                        if (!isPasswordValid)
                            return [2 /*return*/, res
                                    .status(401)
                                    .json({ message: "Email or password does not match!" })];
                        jwtToken = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.SECRETKEY);
                        return [2 /*return*/, res
                                .cookie("api-auth", jwtToken, {
                                secure: false,
                                httpOnly: true,
                                expires: (0, dayjs_1.default)().add(7, "days").toDate(),
                            })
                                .json({ message: "welcome back!", user: user })];
                    case 3:
                        err_1 = _b.sent();
                        console.log("login error", err_1);
                        res.status(500).json({ message: "Cannot login at this moment!" });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.getLogout = function (req, res) {
        req.session = undefined;
        res.clearCookie("api-auth").json({ message: "good bye!" });
    };
    LoginController.prototype.postSignup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, username, password, email, firstName, lastName, role, existingUser, hashedPassword, newUser, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        _a = req.body, username = _a.username, password = _a.password, email = _a.email, firstName = _a.firstName, lastName = _a.lastName, role = _a.role;
                        return [4 /*yield*/, repositories_1.userRepository.findOne({ email: email })];
                    case 1:
                        existingUser = _b.sent();
                        if (existingUser)
                            return [2 /*return*/, res
                                    .status(409)
                                    .json({ message: "User with email already exists!" })];
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, 10)];
                    case 2:
                        hashedPassword = _b.sent();
                        newUser = new models_1.UserModel({
                            username: username,
                            email: email,
                            firstName: firstName,
                            lastName: lastName,
                            role: role,
                            password: hashedPassword,
                        });
                        return [4 /*yield*/, repositories_1.userRepository.create(newUser)];
                    case 3:
                        _b.sent();
                        res.status(201).json({ message: "User registered successfully" });
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _b.sent();
                        console.log("Signup error", err_2);
                        res.status(500).json({ message: "Cannot register user at this moment!" });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, decorators_1.post)("/login"),
        (0, decorators_1.requestSchema)(loginSchema),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "postLogin", null);
    __decorate([
        (0, decorators_1.post)("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogout", null);
    __decorate([
        (0, decorators_1.post)("/signup"),
        (0, decorators_1.requestSchema)(signupSchema),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "postSignup", null);
    LoginController = __decorate([
        (0, decorators_1.controller)("auth")
    ], LoginController);
    return LoginController;
}());
