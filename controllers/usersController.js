// import User from "../models/userModel.js";

import nodemailer from "nodemailer";

import { ctrlWrapper } from "../decorators/index.js";

// import { HttpError } from "../helpers/index.js";

const { UKR_NET_EMAIL, UKR_NET_PASSWORD, BASE_URL } = process.env;

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

const helpRequest = async (req, res) => {
  const { email, text } = req.body;
  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: UKR_NET_EMAIL,
      pass: UKR_NET_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: UKR_NET_EMAIL,
    to: "taskpro.project@gmail.com",
    subject: "Need help",
    text: `${text}, ${email}`,
    html: `<a href="${BASE_URL}/api/users/help/"  target="_blank">Click me</a>`,
  };

  transporter.sendMail(emailOptions);
};

export default {
  getCurrentUser: ctrlWrapper(getCurrentUser),
  helpRequest: ctrlWrapper(helpRequest),
};
