import Joi from "joi";
import {
  nameRegexp,
  emailRegexp,
  passwordRegexp,
  themeList,
} from "../constans/userConstans.js";

const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(32).pattern(nameRegexp).required().messages({
    "any.required": "missing required name field",
    "string.empty": "name cannot be empty",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
    "string.empty": "email cannot be empty",
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "any.required": "missing required password field",
      "string.empty": "password cannot be empty",
    }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
    "string.empty": "email cannot be empty",
  }),
  password: Joi.string()
    .min(8)
    .max(64)
    .pattern(passwordRegexp)
    .required()
    .messages({
      "any.required": "missing required password field",
      "string.empty": "password cannot be empty",
    }),
});

const userLoginGoogleSchema = Joi.object({
  name: Joi.string().min(2).max(32).pattern(nameRegexp).required().messages({
    "any.required": "missing required name field",
    "string.empty": "name cannot be empty",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
    "string.empty": "email cannot be empty",
  }),
});

const userUpdateThemeSchema = Joi.object({
  theme: Joi.string()
    .valid(...themeList)
    .required(),
});

// SV: password is not required!
const userEditDataSchema = Joi.object({
  name: Joi.string().min(2).max(32).pattern(nameRegexp).required().messages({
    "any.required": "missing required name field",
    "string.empty": "name cannot be empty",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
    "string.empty": "email cannot be empty",
  }),
  password: Joi.string().min(8).max(64).pattern(passwordRegexp),
});

const needHelpSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
    "string.empty": "email cannot be empty",
  }),
  comment: Joi.string().required().messages({
    "any.required": "missing required comment field",
    "string.empty": "comment cannot be empty",
  }),
});

export default {
  userRegisterSchema,
  userLoginSchema,
  userLoginGoogleSchema,
  userUpdateThemeSchema,
  userEditDataSchema,
  needHelpSchema,
};
