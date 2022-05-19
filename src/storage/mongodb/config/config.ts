import dotenv from "dotenv";
dotenv.config();

const config = {
  development: {
    mongodb: process.env.MONGO_URI,
  },
  staging: {
    mongodb: process.env.MONGO_URI,
  },

  production: {
    mongodb: process.env.MONGO_URI,
  },
};
export { config };
