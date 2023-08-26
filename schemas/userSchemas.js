import Joi from "joi";
import { emailRegexp, themeList } from "../constans/userConstans.js";

const userRegisterSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "any.required": "missing required name field",
    "string.empty": "name cannot be empty",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
    "string.empty": "email cannot be empty",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "missing required password field",
    "string.empty": "password cannot be empty",
  }),
});

const userLoginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "missing required email field",
    "string.empty": "email cannot be empty",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "missing required password field",
    "string.empty": "password cannot be empty",
  }),
});

const userUpdateThemeSchema = Joi.object({
  theme: Joi.string()
    .valid(...themeList)
    .required(),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": `missing required "email" field`,
  }),
});

export default {
  userRegisterSchema,
  userLoginSchema,
  userUpdateThemeSchema,
  emailSchema,
};
