import jwt from "jsonwebtoken";
import gravatar from "gravatar";

import User from "../models/userModel.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

// helper func for register and login
const createToken = async (userId) => {
  const payload = {
    id: userId,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(userId, { token });

  return token;
};

// ** registerUser for export
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email, {
    // OD: removed await - this is ordinary function, no need
    // OD: default is 80, we have 68 big and 32 small //	s: "200",
    r: "pg",
    d: "mp",
  });

  const newUser = await User.create({
    ...req.body,
    avatarURL,
  });
  const token = await createToken(newUser._id);

  res.status(201).json({
    token,
    user: {
      name,
      email,
      theme: newUser.theme,
      avatarURL,
    },
  });
};

// ** loginUser for export
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
  const token = await createToken(user._id);

  res.json({
    token,
    user: {
      name: user.name,
      email,
      theme: user.theme,
      avatarURL: user.avatarURL,
    },
  });
};

// ** loginUser by Google
const loginGoogleUser = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    const token = await createToken(user._id);
    res.status(201).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        theme: user.theme,
        avatarURL: user.avatarURL
      },
    })
  }
  
  if (!user) {  
    const avatarURL = gravatar.url(email, {
      r: "pg",
      d: "mp",
    });

    const user = await User.create({
    ...req.body,
    avatarURL,
    password: "google123"
  });
  const token = await createToken(user._id);
  res.status(201).json({
    token,
    user: {
      name,
      email,
      theme: user.theme,
      avatarURL
    },
  })
  }
  
};

// ** logoutUser  for export
const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).send();
};

export default {
  loginUser: ctrlWrapper(loginUser),
  registerUser: ctrlWrapper(registerUser),
  loginGoogleUser: ctrlWrapper(loginGoogleUser),
  logoutUser: ctrlWrapper(logoutUser),
};
