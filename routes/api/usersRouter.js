import express from "express";

import usersCtrl from "../../controllers/usersController.js";

import validateBody from "../../decorators/validateBody.js";

import usersSchemas from "../../schemas/userSchemas.js";

import authenticate from "../../middlewares/authenticate.js";

const usersRouter = express.Router();

usersRouter.get("/current", authenticate, usersCtrl.getCurrentUser);

usersRouter.patch(
  "/theme",
  authenticate,
  validateBody(usersSchemas.userUpdateThemeSchema),
  usersCtrl.updateTheme
);

// usersRouter.put(
//   "/:_id",
//   authenticate,
//   validateBody(usersSchemas.userRegisterSchema),
//   usersCtrl.updateUser
// );

// usersRouter.patch(
//   "/avatar",
//   authenticate,
//   uploadAvatar.single("avatar"),
//   usersCtrl.updateAvatar
// );

// usersRouter.patch("/help", authenticate, ..., usersCtrl.helpRequest);

usersRouter.post(
  "/help",
  authenticate,
  validateBody(usersSchemas.emailSchema),
  usersCtrl.helpRequest
);

export default usersRouter;
