import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  addres: String,
  age: Number,
  phone: String,
  photo: String,
});

export const User = mongoose.model("Users", userSchema);
