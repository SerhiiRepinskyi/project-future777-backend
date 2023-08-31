import jwt from "jsonwebtoken";
import gravatar from "gravatar";

import User from "../models/userModel.js";

import { ctrlWrapper } from "../decorators/index.js";

import { HttpError } from "../helpers/index.js";

const { JWT_SECRET } = process.env;

//helper func for register and login
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

const avatarURL = gravatar.url(email, { // OD: removed await - this is ordinary function, no need
	// OD: default is 80, we have 68 big and 32 small //	s: "200",
		r: "pg",
		d: "mp",
	});

	const newUser = await User.create({
		...req.body,
		avatarURL,
	});
	// OD: moved to middleware //await newUser.hashPassword(password);  await newUser.save();

	/* OD: moved to createToken func
	const payload = {
		id: newUser._id,
	};
	const toke n = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
	await User.findByIdAndUpdate(newUser._id, { toke n }); */
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
/* OD: moved to createToken func
	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

	await User.findByIdAndUpdate(user._id, { token }); */
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

// ** logoutUser  for export
const logoutUser = async (req, res) => {
	const { _id } = req.user;
	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).send();
};

export default {
	loginUser: ctrlWrapper(loginUser),
	registerUser: ctrlWrapper(registerUser),
	logoutUser: ctrlWrapper(logoutUser),
};
