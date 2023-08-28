import express from "express";

import usersCtrl from "../../controllers/usersController.js";

import validateBody from "../../decorators/validateBody.js";

import usersSchemas from "../../schemas/userSchemas.js";

import { authenticate, upload } from "../../middlewares/index.js";

const usersRouter = express.Router();

usersRouter.get("/current", authenticate, usersCtrl.getCurrentUser);

usersRouter.use(authenticate);

usersRouter.patch(
  "/theme",
  validateBody(usersSchemas.userUpdateThemeSchema),
  usersCtrl.updateTheme
);

// usersRouter.put(
//   "/",
//   validateBody(usersSchemas.userRegisterSchema),
//   usersCtrl.updateUser
// );

usersRouter.patch(
  "/avatar",
  upload.single("avatarURL"),
  usersCtrl.updateAvatar
);

usersRouter.post(
  "/help",
  validateBody(usersSchemas.needHelpSchema),
  usersCtrl.needHelp
);

export default usersRouter;
