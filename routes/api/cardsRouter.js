import { Router } from "express";

import cardsController from "../../controllers/cardsController.js";
import boardsSchemas from "../../schemas/boardsSchemas.js";
import validateBody from "../../decorators/validateBody.js";
import isValidId from "../../middlewares/isValidId.js";
import authenticate from "../../middlewares/authenticate.js";

const router = Router();
router.use(authenticate);

// ***************** cards routes

// ** get card by id  //NEW!
router.get("/:id", isValidId, cardsController.getCardById);

// ** update card
router.put(
  "/:id",
  isValidId,
  validateBody(boardsSchemas.cardUpdate),
  cardsController.updateCard
);

// ** delete card
router.delete("/:id", isValidId, cardsController.deleteById);

// ** move card
router.patch(
  "/:id",
  isValidId,
  validateBody(boardsSchemas.cardMove), // FIXME: isValidId? somehow...
  cardsController.moveCard
);

export default router;
