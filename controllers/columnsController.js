import Card from "../models/cardModel.js";
import Board from "../models/boardModel.js";
import Column from "../models/columnModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const ERR_NOT_FOUND = (id) => `Column id=${id} not found`;

// ** update column
/**
 * Викликає Column.findByIdAndUpdate
 * @param {*} req Отримує параметр id & body в json-форматі з полем title
 * @param {*} res повертає оновлений об'єкт, статус 200.
 * або помилку, якщо id немає "message": "Not found" з статусом 404
 */
const updateColumn = async (req, res) => {
	const { id } = req.params;
	const result = await Column.findByIdAndUpdate(id, req.body, { new: true }); // =return updated
	if (!result) {
		throw HttpError(404, ERR_NOT_FOUND(id));
	}
	res.json(result);
};

// ** delete column
const deleteById = async (req, res) => {
	const { id } = req.params;
	const result = await Column.findByIdAndDelete(id);
	if (!result) {
		HttpError(404, ERR_NOT_FOUND(id));
	}
  const { owner } = result;
	/* const board = await Board.findById(owner);
	if (board.columns.length > 0) {
		console.log("board.columns.length>>", board.columns.length);
		const isColumnId = (item) => item.columnId === id;
		const ind = board.columns.findIndex(isColumnId);
		if (ind >= 0) {
			await board.save();
		} else {
			throw HttpError(404, `ERR_DEV: id=${board._id}`);
		}
	} */
	res.json({
		message: "Column deleted( FIXME: delete all its cards, and from owner's list)",
	});
};

/**
 * update list of cards // TODO: only for drag-n-drop
 */
const updateCards = async (req, res) => {
	const { id } = req.params;
	const result = await Column.findByIdAndUpdate(id, req.body, { new: true });
	if (!result) {
		throw HttpError(404, ERR_NOT_FOUND(id));
	}
	res.json(result);
};

// ** add card
const addCard = async (req, res) => {
  console.log("addCard>>>>>>>>>>>>>>>>>>");
	const { id: owner } = req.params;

  const result = await Card.create({ ...req.body, owner });
	if (!result) {
		throw HttpError(404, ERR_NOT_FOUND(id));
	}

	//add  to the cards list
		const column = await Column.findById(owner);
		column.cards.push(result);
		await column.save();
	res.status(201).json(result);
};


export default {
	updateColumn: ctrlWrapper(updateColumn),
	deleteById: ctrlWrapper(deleteById), //FIXME: delete all from cards list
	updateCards: ctrlWrapper(updateCards), // TODO: only for drag-n-drop
	addCard: ctrlWrapper(addCard),
};
