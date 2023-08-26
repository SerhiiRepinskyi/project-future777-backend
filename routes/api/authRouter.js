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
  "/login",
  validateBody(usersSchemas.userLoginSchema),
  authCtrl.loginUser
);






authRouter.post("/help", validateBody(usersSchemas.emailSchema), authController.sendNeedHelpEmail);

// router.put(
//   "/:_id",
//   authenticate,
//   validBody(schema.userRegisterSchema),
//   authController.updateUser
// );

// router.patch(
//   "/theme",
//   authenticate,
//   validBody(themeSchema),
//   authController.updateTheme
// );

// router.patch(
//   "/avatars",
//   authenticate,
//   uploadAvatar.single("avatar"),
//   authController.updateAvatar
// );


authRouter.post("/logout", authenticate, authCtrl.logoutUser);


export default authRouter;
