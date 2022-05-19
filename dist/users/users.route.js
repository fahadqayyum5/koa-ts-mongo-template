"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { createUser, getUsers, getUser, updateUser, deleteUser, } = require("./users.controller");
const router_1 = __importDefault(require("@koa/router"));
const route = new router_1.default();
//Add New User
route.post("/users", createUser);
//Get All Users
route.get("/users", getUsers);
//Get Single User
route.get("/users/:id", getUser);
//Update User
route.put("/users/:id", updateUser);
// //Delete  User
route.delete("/users/:id", deleteUser);
exports.default = route;
