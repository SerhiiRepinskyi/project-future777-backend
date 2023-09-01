import { Router } from "express";

import columnsController from "../../controllers/columnsController.js";
import boardsSchemas from "../../schemas/boardsSchemas.js"; // TODO: ?
import validateBody from "../../decorators/validateBody.js";
import isValidId from "../../middlewares/isValidId.js";
import authenticate from "../../middlewares/authenticate.js";

const router = Router();
router.use(authenticate);

// ***************** columns routes

 // ** get all cards for column with id //NEW!
router.get("/:id/cards", isValidId, columnsController.getAllCards);
// get filtered cards "/:id/cards?f=0"
// ** get column by id  //NEW!
router.get("/:id", isValidId, columnsController.getColumnById);


// ** update column
router.patch(
  "/:id",
  isValidId,
  validateBody(boardsSchemas.columnSchema),
  columnsController.updateColumn
);

// ** delete column
router.delete("/:id", isValidId, columnsController.deleteById);

// ** add card
router.post(
  "/:id/cards",
  isValidId,
  validateBody(boardsSchemas.cardAdd),
  columnsController.addCard
);

export default router;
