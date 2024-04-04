"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var morgan_1 = __importDefault(require("morgan"));
var mongoose_1 = __importDefault(require("mongoose"));
var dotenv_1 = __importDefault(require("dotenv"));
var appRouter_1 = require("./appRouter");
require("./controllers/LoginController");
require("./controllers/RouteController");
var express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json({ type: "*/*" }));
app.use((0, cookie_session_1.default)({ keys: ["login"] }));
app.use((0, morgan_1.default)("combined"));
mongoose_1.default
    .connect("mongodb://localhost:27017/".concat(process.env.DB_NAME))
    .then(function () {
    app.use(appRouter_1.AppRouter.getInstance());
    var port = process.env.PORT || 3090;
    app.listen(port, function () {
        console.log("Listening on post ", port);
    });
    console.log((0, express_list_endpoints_1.default)(app));
})
    .catch(function (err) { return console.log("Failed to connect to database: ", err); });
