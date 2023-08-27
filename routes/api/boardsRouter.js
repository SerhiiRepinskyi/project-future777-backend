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
// ** get list of boards
router.get("/", boardsController.getAll);
// ** get boards by id
router.get("/:id", isValidId, boardsController.getById);
// ** delete board by id
router.delete("/:id", isValidId, boardsController.deleteById);
// ** add board
router.post("/", validateBody(boardsSchemas.boardAdd), boardsController.add);
// ** update board by id (NB! except columns list)
router.patch(
	"/:id",
	//TODO: isEmptyBody,
	isValidId,
	validateBody(boardsSchemas.boardUpdate), //FIXME: should be same as create ?
	boardsController.updateById
);
// ** update board by id - only columns list) // TODO: only for drag-n-drop
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
