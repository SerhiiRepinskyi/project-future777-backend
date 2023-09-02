import express from "express";

import authCtrl from "../../controllers/authController.js";

import validateBody from "../../decorators/validateBody.js";

import usersSchemas from "../../schemas/userSchemas.js";

import authenticate from "../../middlewares/authenticate.js";


const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(usersSchemas.userRegisterSchema),
  authCtrl.registerUser
);

authRouter.post(
  "/google",
  validateBody(usersSchemas.userLoginGoogleSchema),
  authCtrl.loginGoogleUser
);

authRouter.post(
  "/login",
  validateBody(usersSchemas.userLoginSchema),
  authCtrl.loginUser
);

authRouter.post("/logout", authenticate, authCtrl.logoutUser);

export default authRouter;
