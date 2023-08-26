// import User from "../models/userModel.js";

import { ctrlWrapper } from "../decorators/index.js";

// import { HttpError } from "../helpers/index.js";

const getCurrentUser = (req, res) => {
  const { name, email, theme } = req.user;
  res.json({
    name,
    email,
    theme,
  });
};

// const updateUser = async (req, res) => {};

// const updateAvatar = async (req, res) => {};

// const updateTheme = async (req, res) => {};

export default {
  getCurrentUser: ctrlWrapper(getCurrentUser),
};
