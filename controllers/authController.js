import jwt from "jsonwebtoken";

import User from "../models/userModel.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
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

const login = async (req, res) => {
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

const getCurrent = (req, res) => {
  const { name, email, theme } = req.user;
  res.json({
    name,
    email,
    theme,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

// const updateUser = async (req, res) => {};

// const updateAvatar = async (req, res) => {};

// const updateTheme = async (req, res) => {};

export default {
  login: ctrlWrapper(login),
  register: ctrlWrapper(register),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
};
