import Card from "../models/cardModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import Column from "../models/columnModel.js";
import { deleteCard } from "./helper.js";

const CARD_NOT_FOUND = (id) => `Card id=${id} not found`;

// ** get card by Id  NEW!
const getCardById = async (req, res) => {
	const { id } = req.params;
	const result = await Card.findById(id, "-createdAt -updatedAt -__v");
	if (!result) {
		throw HttpError(404, CARD_NOT_FOUND(id));
	}
	res.json(result);
};

// ** update card
const updateCard = async (req, res) => {
	const { id } = req.params;
	const result = await Card.findByIdAndUpdate(id, req.body, { new: true }); // =return updated
	if (!result) {
		throw HttpError(404, CARD_NOT_FOUND(id));
	}
	res.json(result);
};

// ** delete card
const deleteById = async (req, res) => {
	const { id } = req.params;
  const result = await deleteCard(id, false);
  if (result) {
    res.json({
			message: `Card id=${id} is deleted and removed from owner's list`,
		});
  } else {
    throw HttpError(404, CARD_NOT_FOUND(id));
  }
};

// ** move card
const moveCard = async (req, res) => {
	const { newOwnerId } = req.body;
	const { id } = req.params;
	const cardToMove = await Card.findById(id);
	if (!cardToMove) {
		throw HttpError(404, `Card to move not found`);
	}
	const { owner } = cardToMove;
	const oldColumn = await Column.findById(owner);
	if (!oldColumn) {
		throw HttpError(404, `Column to move from not found`);
	}

	const newColumn = await Column.findById(newOwnerId);
	if (!newColumn) {
		throw HttpError(404, `Column to move to not found`);
	}
	console.log("array to remove card from>>>", oldColumn.cards);
	console.log("array to put card to>>>", newColumn.cards);

	oldColumn.cards.pull(id);
	newColumn.cards.addToSet(id); //addToSet
	cardToMove.owner = newColumn;
	await oldColumn.save();
	await newColumn.save();
	await cardToMove.save();

	res.json({ message: "Card moved" });
};

export default {
	getCardById: ctrlWrapper(getCardById),
	updateCard: ctrlWrapper(updateCard),
	deleteById: ctrlWrapper(deleteById),
	moveCard: ctrlWrapper(moveCard),
};
