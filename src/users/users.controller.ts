const { User } = require("../storage/mongodb/models/User.model");
import { IUserAttrs } from "../storage/mongodb/interfaces/interface.common";
import Koa from "koa";

//Create User
const createUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  console.log("Create User Called");

  const { name, age, address } = ctx.request.body as IUserAttrs;

  const user = await User.findOne({ name: name });
  if (user) {
    ctx.throw(400, "This User Already Exists");
    return;
  }

  await User.create({
    name,
    age,
    address,
  });
  ctx.status = 201;
  ctx.body = { success: true, message: "User Created Successfully" };
};

//Get All Users
const getUsers = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  const users = await User.find();
  if (users.length < 0) {
    ctx.status = 404;
    ctx.body = { success: false, error: "Users Not Found" };
    return;
  }

  ctx.status = 200;
  ctx.body = { success: true, users: users };
};

//Get Single User
const getUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  const userId = ctx.params.id as string;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, error: "User Not Found" };
    return;
  }
  ctx.status = 200;
  ctx.body = { success: true, user: user };
};

//Update User
const updateUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  const userId = ctx.params.id as string;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, error: "User Not Found" };
    return;
  }
  //extract body
  const { name, age, address } = ctx.request.body as IUserAttrs;
  user.name = name;
  user.age = age;
  user.address = address;

  await user.save();

  ctx.status = 200;
  ctx.body = { success: true, updatedUser: user };
};

//Delete User
const deleteUser = async (ctx: Koa.DefaultContext, next: Koa.Next) => {
  const userId = ctx.params.id as string;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    ctx.status = 404;
    ctx.body = { success: false, error: "User Not Found" };
    return;
  }

  const deleteUser = await User.deleteOne({ _id: userId });
  ctx.status = 200;
  ctx.body = { success: true, deletedUser: deleteUser };
};

export { createUser, getUsers, getUser, updateUser, deleteUser };
