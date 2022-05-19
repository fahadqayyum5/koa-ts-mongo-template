import Koa from "koa";

import logger from "koa-logger";

import json from "koa-json";

import bodyParser from "koa-bodyparser";

import chalk from "chalk";

import cors from "@koa/cors";

import dotenv from "dotenv";
dotenv.config();

import colors from "colors";

const app = new Koa();
//Database Connection...
import { connectDatabase } from "./storage/mongodb/config/connectToDatabase";
connectDatabase();

import userRoutes from "./users/users.route";

// Middlewares

//Error handling Middleware
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err: any) {
    ctx.status = err.status || 500;
    ctx.body = err.message;

    ctx.app.emit("error", err, ctx);
  }
});

app.on("error", (err, ctx) => {
  ctx.body = { success: false, error: err.message, statusCode: err.status };
});

app.use(json());

//cors middleware
app.use(cors());

// Koa Logger
if (process.env.NODE_ENV === "development") {
  app.use(logger());
}
//Body Parser
app.use(bodyParser());

//Routes
app.use(userRoutes.routes()).use(userRoutes.allowedMethods());

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}!`.green.bold
  );
});
