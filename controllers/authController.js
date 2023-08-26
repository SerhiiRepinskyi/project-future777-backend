import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import "dotenv/config";

import User from "../models/userModel.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const { JWT_SECRET, UKR_NET_EMAIL, UKR_NET_PASSWORD, BASE_URL } = process.env;

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = await User.create({
    ...req.body,
  });
  await newUser.hashPassword(password);
  await newUser.save();

  const payload = {
    id: newUser._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    token,
    user: {
      name,
      email,
      theme: newUser.theme,
    },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const validatePassword = await user.comparePassword(password);
  if (!validatePassword) {
    throw HttpError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      name: user.name,
      email,
      theme: user.theme,
    },
  });
};

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};


const sendNeedHelpEmail = async (req, res) => {
  const { email, text } = req.body
  const config = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: UKR_NET_EMAIL,
      pass: UKR_NET_PASSWORD,
    },
  }

  const transporter = nodemailer.createTransport(config)
  const emailOptions = {
    from: UKR_NET_EMAIL,
    to: 'taskpro.project@gmail.com',
    subject: 'Need help',
    text: `${text}, ${email}`,
    html: `<a href="${BASE_URL}/api/users/help/"  target="_blank">Click me</a>`,
  }

  transporter.sendMail(emailOptions)
};

// const updateUser = async (req, res) => {};

// const updateAvatar = async (req, res) => {};

// const updateTheme = async (req, res) => {};


export default {
  loginUser: ctrlWrapper(loginUser),
  registerUser: ctrlWrapper(registerUser),
  logoutUser: ctrlWrapper(logoutUser),
  sendNeedHelpEmail: ctrlWrapper(sendNeedHelpEmail),
    
    

};
