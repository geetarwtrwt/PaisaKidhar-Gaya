import { Schema, model, models } from "mongoose";
import bcrypt from "bcryptjs";

let modelSchema = Schema({
  userImg: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export let hashPassword = async (password) => {
  try {
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    return console.log(err.message);
  }
};

export let userModel = models.user || model("user", modelSchema);
