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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const { User } = require("../storage/mongodb/models/User.model");
//Create User
const createUser = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Create User Called");
    const { name, age, address } = ctx.request.body;
    const user = yield User.findOne({ name: name });
    if (user) {
        ctx.throw(400, "This User Already Exists");
        return;
    }
    yield User.create({
        name,
        age,
        address,
    });
    ctx.status = 201;
    ctx.body = { success: true, message: "User Created Successfully" };
});
exports.createUser = createUser;
//Get All Users
const getUsers = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User.find();
    if (users.length < 0) {
        ctx.status = 404;
        ctx.body = { success: false, error: "Users Not Found" };
        return;
    }
    ctx.status = 200;
    ctx.body = { success: true, users: users };
});
exports.getUsers = getUsers;
//Get Single User
const getUser = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.params.id;
    const user = yield User.findOne({ _id: userId });
    if (!user) {
        ctx.status = 404;
        ctx.body = { success: false, error: "User Not Found" };
        return;
    }
    ctx.status = 200;
    ctx.body = { success: true, user: user };
});
exports.getUser = getUser;
//Update User
const updateUser = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.params.id;
    const user = yield User.findOne({ _id: userId });
    if (!user) {
        ctx.status = 404;
        ctx.body = { success: false, error: "User Not Found" };
        return;
    }
    //extract body
    const { name, age, address } = ctx.request.body;
    user.name = name;
    user.age = age;
    user.address = address;
    yield user.save();
    ctx.status = 200;
    ctx.body = { success: true, updatedUser: user };
});
exports.updateUser = updateUser;
//Delete User
const deleteUser = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = ctx.params.id;
    const user = yield User.findOne({ _id: userId });
    if (!user) {
        ctx.status = 404;
        ctx.body = { success: false, error: "User Not Found" };
        return;
    }
    const deleteUser = yield User.deleteOne({ _id: userId });
    ctx.status = 200;
    ctx.body = { success: true, deletedUser: deleteUser };
});
exports.deleteUser = deleteUser;
