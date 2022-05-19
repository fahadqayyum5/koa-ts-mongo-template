const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("./users.controller");

import Router from "@koa/router";

const route = new Router();

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

export default route;
