import express from "express";

import usersCtrl from "../../controllers/usersController.js";

import validateBody from "../../decorators/validateBody.js";

import usersSchemas from "../../schemas/userSchemas.js";

import { authenticate, upload } from "../../middlewares/index.js";

const usersRouter = express.Router();

usersRouter.get("/current", authenticate, usersCtrl.getCurrentUser);

usersRouter.patch(
  "/theme",
  authenticate,
  validateBody(usersSchemas.userUpdateThemeSchema),
  usersCtrl.updateTheme
);

// usersRouter.put(
//   "/",
//   authenticate,
//   validateBody(usersSchemas.userRegisterSchema),
//   usersCtrl.updateUser
// );

usersRouter.patch(
  "/avatar",
  authenticate,
  upload.single("avatarURL"),
  usersCtrl.updateAvatar
);

usersRouter.post(
  "/help",
  authenticate,
  validateBody(usersSchemas.needHelpSchema),
  usersCtrl.needHelp
);

export default usersRouter;
