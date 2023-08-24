import Joi from "joi";
import { emailRegexp } from "../constans/user-constans.js";

const userSingUpSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

const userSinginSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
})

export default {
    userSingUpSchema,
    userSinginSchema,
}