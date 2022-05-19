import { Schema, model, connect, Types } from "mongoose";
import { IUserAttrs } from "../interfaces/interface.common";

const userSchema = new Schema<IUserAttrs>({
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

const User = model<IUserAttrs>("User", userSchema);

export { User };
