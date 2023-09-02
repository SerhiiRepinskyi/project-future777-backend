import fs from "fs/promises";
import generateCloudinarySignature from "../helpers/CloudinaryModule.js";

import User from "../models/userModel.js";

import { ctrlWrapper } from "../decorators/index.js";

import {
  HttpError,
  cloudinary,
  createEmail,
  sendEmail,
} from "../helpers/index.js";

const getCurrentUser = (req, res) => {
  const { name, email, theme, avatarURL } = req.user;
  res.json({
    name,
    email,
    theme,
    avatarURL,
  });
};

const updateTheme = async (req, res) => {
  const { _id } = req.user;
  const { theme } = req.body;

  const user = await User.findByIdAndUpdate(_id, { theme }, { new: true });

  res.json({
    user: {
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatarURL: user.avatarURL,
    },
  });
};

const updateUser = async (req, res) => {
  // OD:  const { _id } = req.user;
  const { name, email, password } = req.body;

  /* OD: no need
  const user = await User.findByIdAndUpdate(
    _id,
    { name, email },
    { new: true }
  ); */

  // OD: moved to middleware pre "save" // await user.hashPassword(password);
  /* const user = { ...req.user, name, email, password };
	await user.save(); */

  req.user.name = name;
  req.user.email = email;
  req.user.password = password;
  await req.user.save();

  const user = req.user;

  res.json({
    user: {
      name: user.name,
      email: user.email,
      theme: user.theme,
      avatarURL: user.avatarURL,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: filePath } = req.file;
  const timestamp = Math.round(new Date().getTime() / 1000);

  const fileData = await cloudinary.uploader.upload(filePath, {
    folder: "teamproject/avatar",
    timestamp: timestamp,
  });
  console.log(fileData.signature);

  await User.findByIdAndUpdate(_id, { avatarURL: fileData.url });

  fs.unlink(filePath);

  res
    .status(200)
    .json({ avatarURL: fileData.url, signature: fileData.signature });
};

const needHelp = async (req, res) => {
  const { email, comment } = req.body;
  if (!email) {
    throw HttpError(400, "Email is required field");
  }
  if (!comment) {
    throw HttpError(400, "Comment is required field");
  }

  const helpEmail = createEmail({ email, comment });

  await sendEmail(helpEmail);

  res.json({
    message: "Email send success",
  });
};

export default {
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateTheme: ctrlWrapper(updateTheme),
  updateUser: ctrlWrapper(updateUser),
  updateAvatar: ctrlWrapper(updateAvatar),
  needHelp: ctrlWrapper(needHelp),
};
