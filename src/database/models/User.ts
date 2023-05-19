import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    max: 20,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: 8,
    required: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
