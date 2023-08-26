import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import { handleMongooseError, validateAtUpdate } from "./hooks.js";
import { emailRegexp, themeList } from "../constans/userConstans.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
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
      required: [true, "Password is required"],
    },
    theme: {
      type: String,
      enum: [...themeList],
      default: "Dark",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: { type: String, default: "" },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.hashPassword = async function (password) {
  this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.pre("findOneAndUpdate", validateAtUpdate);

userSchema.post("save", handleMongooseError);
userSchema.post("findOneAndUpdate", handleMongooseError);

const User = model("user", userSchema);

export default User;
