import express from "express";

import usersCtrl from "../../controllers/usersController.js";

import authenticate from "../../middlewares/authenticate.js";

const usersRouter = express.Router();

usersRouter.get("/current", authenticate, usersCtrl.getCurrentUser);

// usersRouter.put(
//   "/:_id",
//   authenticate,
//   validBody(schema.userRegisterSchema),
//   authController.updateUser
// );

// usersRouter.patch(
//   "/theme",
//   authenticate,
//   validBody(themeSchema),
//   authController.updateTheme
// );

// usersRouter.patch(
//   "/avatars",
//   authenticate,
//   uploadAvatar.single("avatar"),
//   authController.updateAvatar
// );

export default usersRouter;
