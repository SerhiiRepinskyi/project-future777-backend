import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { handleMongooseError, validateAtUpdate, hashPwd } from "./hooks.js";
import {
  nameRegexp,
  emailRegexp,
  passwordRegexp,
  themeList,
} from "../constans/userConstans.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: [2, "Name should be at least 2 characters long"],
      maxlength: [32, "Name should not exceed 32 characters"],
      match: nameRegexp,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      match: emailRegexp,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      minlength: [8, "Password should be at least 2 characters long"],
      maxlength: [64, "Password should not exceed 32 characters"],
      match: passwordRegexp,
      required: [true, "Password is required"],
    },
    theme: {
      type: String,
      enum: [...themeList],
      default: "dark",
    },
    avatarURL: { type: String, default: "" },
    token: {
      type: String,
      default: "",
    },
  },
  { versionKey: false, timestamps: true }
);

/* OD: converted to middleware pre "save"
// userSchema.methods.hashPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
}; */

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", hashPwd); // OD:
userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleMongooseError);
userSchema.post("findOneAndUpdate", handleMongooseError);

const User = model("user", userSchema);

export default User;
