import { Router } from "express";

import boardsController from "../../controllers/boardsController.js";
import boardsSchemas from "../../schemas/boardsSchemas.js";
import validateBody from "../../decorators/validateBody.js";
//import isEmptyBody from "../../middlewares/isEmptyBody.js";
import isValidId from "../../middlewares/isValidId.js";
import authenticate from "../../middlewares/authenticate.js";

const router = Router();
router.use(authenticate);

// ***************** boards routes

// ** get list of boards of the current user
router.get("/", boardsController.getAll);

// ** get board by id
//    may include fields parameter like "?fields=iconId title"
//    then returns specified fields, otherwise "title iconId background" fields
router.get("/:id", isValidId, boardsController.getById);

// ** get board content by id
router.get("/:id/content", isValidId, boardsController.getContent);

// ** delete board by id
router.delete("/:id", isValidId, boardsController.deleteById);

// ** add board for the current user
router.post("/", validateBody(boardsSchemas.boardAdd), boardsController.add);

// ** update board by id (NB! except columnsList)
router.patch(
  "/:id",
  //TODO: isEmptyBody,
  isValidId,
  validateBody(boardsSchemas.boardUpdate), //FIXME: should be same as create ?
  boardsController.updateById
);

// ** update board by id - only columnsList) // TODO: only for drag-n-drop
router.patch(
  "/:id/columns",
  isValidId,
  validateBody(boardsSchemas.boardUpdateColumns),
  boardsController.updateColumns
);

// ** add column
router.post(
  "/:id/columns",
  isValidId,
  validateBody(boardsSchemas.columnSchema),
  boardsController.addColumn
);

export default router;
