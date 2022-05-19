"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name Is Required"],
    },
    age: {
        type: Number,
        required: [true, "Age Is Required"],
    },
    address: {
        type: String,
        required: [true, "Address Is Required"],
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.User = User;
