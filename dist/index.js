"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const cors_1 = __importDefault(require("@koa/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = new koa_1.default();
//Database Connection...
const connectToDatabase_1 = require("./storage/mongodb/config/connectToDatabase");
(0, connectToDatabase_1.connectDatabase)();
const users_route_1 = __importDefault(require("./users/users.route"));
// Middlewares
//Error handling Middleware
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit("error", err, ctx);
    }
}));
app.on("error", (err, ctx) => {
    ctx.body = { success: false, error: err.message, statusCode: err.status };
});
app.use((0, koa_json_1.default)());
//cors middleware
app.use((0, cors_1.default)());
// Koa Logger
if (process.env.NODE_ENV === "development") {
    app.use((0, koa_logger_1.default)());
}
//Body Parser
app.use((0, koa_bodyparser_1.default)());
//Routes
app.use(users_route_1.default.routes()).use(users_route_1.default.allowedMethods());
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}!`);
});
