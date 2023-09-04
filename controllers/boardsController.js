import Board from "../models/boardModel.js";
import Column from "../models/columnModel.js";
import Card from "../models/cardModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
import { deleteBoard } from "./helper.js";


const BOARD_NOT_FOUND = (id) => `Board id=${id} not found`;

const BOARD_FIELDS_DEFAULT = "title iconId background";
//const matchNotDeleted = { isDeleted: false };

// ** get all boards of the current user
const getAll = async (req, res) => {
	const { _id: owner } = req.user; // TODO: add boards [] to user model
	const filter = { owner,}; // isDeleted: false
	let { fields } = req.query;
	//console.log("getById>>>query", req.query);
	const result = await Board.find(
		filter,
		fields ?? BOARD_FIELDS_DEFAULT
	).lean().exec(); // "-owner -createdAt -updatedAt -__v");
	res.json(result);
};

/**
 * get board by id
 * @param {*} req
 * if the req parameters string includes list of fields separated by spaces,
 * such as "?fields=iconId title", then @param {*} res contains specified fields,
 * othewise "title iconId background" fields
 */
const getById = async (req, res) => {
	let { fields } = req.query;
	const { id } = req.params;
	const result = await Board.findById(
		id,
		fields ?? BOARD_FIELDS_DEFAULT
	).lean();
	if (!result) {
		throw HttpError(404, BOARD_NOT_FOUND(id));
	}
	res.json(result);
};

// ** get all columns/cards of the board with optional filter by priority (ДОДАНО 2023-09-02)
const getContent = async (req, res) => {
	const { id } = req.params;
	const { priority } = req.query;
	const matchCard = {}; // isDeleted: false
	if (!!priority) matchCard.priority = priority;

	const contentQuery = Board.findById(id, "title content background iconId")
		.lean()
		.populate({
			path: "content",
			model: Column,
			//	match: matchNotDeleted,
			select: "title _id cards",
			populate: {
				path: "cards",
				model: Card,
				match: matchCard,
				select: "title description priority deadline",
			},
		});
	// Query to get all boards with the columns and
	const content = await contentQuery.exec();

	res.json(content);
};

// ** add column to the board
const add = async (req, res) => {
	const { _id: owner } = req.user;
	const result = await Board.create({ ...req.body, owner });
	/* TODO: find???.select("title description priority deadline").exec()		 */
	res.status(201).json(result); // TODO: remove from result "-owner -createdAt -updatedAt -__v" NO NEED for data?
};

// ** delete board
const deleteById = async (req, res) => {
	const { id } = req.params;
  const result = await deleteBoard(id);
  if (result) { res.json({
		message: `Board id=${id} is deleted with all its content`, //and removed from owner's list
	}); } else {
    throw HttpError(404, BOARD_NOT_FOUND(id));
  }
};

// ** update board
const updateById = async (req, res) => {
	const { id } = req.params;
	const result = await Board.findByIdAndUpdate(id, req.body, { new: true }); // =return updated
	if (!result) {
		throw HttpError(404, BOARD_NOT_FOUND(id));
	}
	res.json(result); // TODO: remove from result "-owner -createdAt -updatedAt -__v"
};

// ** update list of columns // TODO: only for drag-n-drop
const updateColumns = async (req, res) => {
	throw HttpError(404, `id=${id} under construction TODO:`);

	const { id } = req.params;
	const result = await Board.findByIdAndUpdate(id, req.body, { new: true });
	if (!result) {
		throw HttpError(404, `id=${id}`);
	}
	res.json(result);
};

// ** add column to the board
const addColumn = async (req, res) => {
	const { id: owner } = req.params;
	const board = await Board.findById(owner);
	if (!board) {
		throw HttpError(404, BOARD_NOT_FOUND(owner));
	}

	//console.log("owner>>>>>>>>>>>>>>>>>>", owner);
	const result = await Column.create({ ...req.body, owner });
	if (!result) {
		throw HttpError(404, BOARD_NOT_FOUND(id));
	}

	//add  to the cards list
	board.content.push(result);

	await board.save();
	res.status(201).json(result);
};

export default {
	getContent: ctrlWrapper(getContent),
	getAll: ctrlWrapper(getAll),
	add: ctrlWrapper(add),
	getById: ctrlWrapper(getById), //TODO: not needed???
	updateById: ctrlWrapper(updateById),
	deleteById: ctrlWrapper(deleteById),
	updateColumns: ctrlWrapper(updateColumns),
	addColumn: ctrlWrapper(addColumn),
};
