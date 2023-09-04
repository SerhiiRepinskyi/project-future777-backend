import Card from "../models/cardModel.js";
import Board from "../models/boardModel.js";
import Column from "../models/columnModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { deleteColumn } from "./helper.js";

const COLUMN_NOT_FOUND = (id) => `Column id=${id} not found`;

// ** get all cards // TODO: to remove??? no need ???
const getAllCards = async (req, res) => {
  const { id } = req.params;const { f } = req.query;
  console.log("getAllCards>>>query", req.query, f, typeof f);

  const { cards } = await Column.findById(id);
  let query = Card.find().where("_id").in(cards);
  if (!!f) {
    query = query.where("priority").equals(f);
  }
  const result = await query.exec(); //Card.find().where('_id').in(cards).where("priority").equals(f).exec();
  res.json(result);
};

// ** get column by id
const getColumnById = async (req, res) => {
	const { id } = req.params;
	const result = await Column.findById(id, "-owner -createdAt -updatedAt -__v");
	if (!result) {
		throw HttpError(404, COLUMN_NOT_FOUND(id));
	}
	res.json(result);
};

// ** update column
const updateColumn = async (req, res) => {
	const { id } = req.params;
	const result = await Column.findByIdAndUpdate(id, req.body, { new: true }); // =return updated
	if (!result) {
		throw HttpError(404, COLUMN_NOT_FOUND(id));
	}
	res.json(result);
};

// ** delete column
const deleteById = async (req, res) => {
		const { id } = req.params;
  const result = await deleteColumn(id, false);
  if (result) {
    res.json({ message: `Column id=${id} and its cards are deleted and removed from owner's list` });
  } else {
		throw HttpError(404, COLUMN_NOT_FOUND(id));
	}
};

/**
 * update list of cards // TODO: only for drag-n-drop
 */
const updateCards = async (req, res) => {
	const { id } = req.params;
	const result = await Column.findByIdAndUpdate(id, req.body, { new: true });
	if (!result) {
		throw HttpError(404, COLUMN_NOT_FOUND(id));
	}
	res.json(result);
};

// ** add card
const addCard = async (req, res) => {
	//console.log("addCard>>>>>>>>>>>>>>>>>>");
	const { id: owner } = req.params;
	const column = await Column.findById(owner);
	if (!column) {
		throw HttpError(404, COLUMN_NOT_FOUND(owner));
	}

	const result = await Card.create({ ...req.body, owner });
	if (!result) {
		throw HttpError(404, COLUMN_NOT_FOUND(id));
	}

	//add  to the cards list
	column.cards.push(result);
	await column.save();
	res.status(201).json(result);
};

export default {
  getAllCards: ctrlWrapper(getAllCards), // TODO: no need???
  getColumnById: ctrlWrapper(getColumnById),
	updateColumn: ctrlWrapper(updateColumn),
	deleteById: ctrlWrapper(deleteById), 
	updateCards: ctrlWrapper(updateCards), // TODO: only for drag-n-drop
	addCard: ctrlWrapper(addCard),
};
