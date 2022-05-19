import mongoose, { ConnectOptions } from "mongoose";
// import chalk from "chalk";

import { config } from "./config";

const environment = process.env.NODE_ENV as keyof typeof config;

const currentConf = config[environment];

async function connectDatabase() {
  try {
    const conn = await mongoose.connect(currentConf.mongodb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
    if (conn) {
      console.log(
        // chalk.bold.greenBright
        `Connected To The ${conn.connection.host}`
      );
    }
  } catch (error: any) {
    console.log(error.message, error.stack);
  }
}

export { connectDatabase };
