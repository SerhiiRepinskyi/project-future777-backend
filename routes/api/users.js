import express from "express";
import validateBody from "../../decorators/validateBody.js";
import usersSchema from "../../schemas/users-schema.js";
import authController from "../../controllers/auth-controller.js"
import authenticate from "../../helpers/authenticate.js";


const authRouter = express.Router();

authRouter.post ('/register', validateBody(usersSchema.userSingUpSchema), authController.singup );
authRouter.post ('/login', validateBody(usersSchema.userSinginSchema), authController.singin );
authRouter.get ('/current', authenticate, authController.getCurrent);
authRouter.post ('/signout', authenticate, authController.signout)
export default authRouter;