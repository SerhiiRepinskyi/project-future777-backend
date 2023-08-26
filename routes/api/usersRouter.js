import express from "express";

import usersCtrl from "../../controllers/usersController.js";

import authenticate from "../../middlewares/authenticate.js";

const usersRouter = express.Router();

usersRouter.get("/current", authenticate, usersCtrl.getCurrentUser);

// usersRouter.patch(
//   "/theme",
//   authenticate,
//   validBody(themeSchema),
//   usersCtrl.updateTheme
// );

// usersRouter.put(
//   "/:_id",
//   authenticate,
//   validBody(schema.userRegisterSchema),
//   usersCtrl.updateUser
// );

// usersRouter.patch(
//   "/avatar",
//   authenticate,
//   uploadAvatar.single("avatar"),
//   usersCtrl.updateAvatar
// );

// usersRouter.patch("/help", authenticate, ..., usersCtrl.helpRequest);

export default usersRouter;
