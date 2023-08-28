import fs from "fs/promises";

import User from "../models/userModel.js";

import { ctrlWrapper } from "../decorators/index.js";

import {
  HttpError,
  cloudinary,
  createEmail,
  sendEmail,
} from "../helpers/index.js";

const getCurrentUser = (req, res) => {
  const { name, email, theme } = req.user;
  res.json({
    name,
    email,
    theme,
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
    },
  });
};

// const updateUser = async (req, res) => { твій код :) };

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: filePath } = req.file;
  const fileData = await cloudinary.uploader.upload(filePath, {
    folder: "teamProject/avatar",
  });
  console.log(fileData.url);
  await User.findByIdAndUpdate(_id, { avatarURL: fileData.url });
  fs.unlink(filePath);
  res.status(200).json({ avatarURL: fileData.url });
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
  updateAvatar: ctrlWrapper(updateAvatar),
  needHelp: ctrlWrapper(needHelp),
};
