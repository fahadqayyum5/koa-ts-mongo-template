"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
exports.config = config;
