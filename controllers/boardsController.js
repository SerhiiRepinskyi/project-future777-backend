import Board from "../models/boardModel.js";
import Column from "../models/columnModel.js";
import Card from "../models/cardModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";
//import boardsSchemas from "../schemas/boardsSchemas.js";

const ERR_NOT_FOUND = (id) => `Board id=${id} not found`;

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const filter = { owner };
  const result = await Board.find(filter, "-owner -createdAt -updatedAt -__v");
  res.json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findById(id, "-owner -createdAt -updatedAt -__v");
  if (!result) {
    throw HttpError(404, ERR_NOT_FOUND(id));
  }
  res.json(result);
};


// # get all columns/cards of the board with optional filter by priority (ДОДАНО 2023-09-02)
// router.get(/:id/columns, boardsController.getContent);
// router.get(/:id/columns?priority=2, boardsController.getContent);
const getContent = async (req, res) => { //FIXME:
  const { id } = req.params;
  const { priority } = req.query;
  console.log("getContent>>>query", req.query, priority, typeof priority);

  const matchCard = { isDeleted: false };
  if (!!priority) matchCard.priority = priority;

  const contentQuery = Board.findById(id, "content").lean().populate({
		path: "content",
		model: Column,
		match: { isDeleted: false },
		select: "title _id cards",
		populate: {
			path: "cards",
			model: Card,
			match: matchCard,
			select: "title description priority deadline _id",
		},
	});
  // Query to get all boards with the columns and
  const content = await contentQuery.exec();

  res.json(content);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Board.create({ ...req.body, owner });
  res.status(201).json(result); // TODO: remove from result "-owner -createdAt -updatedAt -__v"
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndDelete(id); // or findByIdAndRemove
  if (!result) {
    throw HttpError(404, ERR_NOT_FOUND(id));
  }
  res.json({
    message: "Board deleted( FIXME: delete all its columns and cards)",
  });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Board.findByIdAndUpdate(id, req.body, { new: true }); // =return updated
  if (!result) {
    throw HttpError(404, ERR_NOT_FOUND(id));
  }
  res.json(result); // TODO: remove from result "-owner -createdAt -updatedAt -__v"
};

/**
 * update list of columns // TODO: only for drag-n-drop
 */
const updateColumns = async (req, res) => {
  throw HttpError(404, `id=${id} under construction FIXME:`);

  const { id } = req.params;
  const result = await Board.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `id=${id}`);
  }
  res.json(result);
};

/**
 * add column
 */
/**
 * Викликає Column.create
 * @param {*} req Отримує body ({title})-обов'язкові
 * @param {*} res повертає об'єкт з id і статусом 201
 */
const addColumn = async (req, res) => {
	const { id: owner } = req.params;
	const board = await Board.findById(owner);
	if (!board) {
		throw HttpError(404, ERR_NOT_FOUND(owner));
	}

	//console.log("owner>>>>>>>>>>>>>>>>>>", owner);
	const result = await Column.create({ ...req.body, owner });
	if (!result) {
		throw HttpError(404, ERR_NOT_FOUND(id));
	}
	const { _id: columnId, title: columnTitle } = result;

	//add  to the cards list
	board.content.push(result);
	board.columns.push({ columnId, columnTitle }); //FIXME:
	await board.save();
	res.status(201).json(result);
};

export default {
	getContent: ctrlWrapper(getContent),
	getAll: ctrlWrapper(getAll),
	add: ctrlWrapper(add),
	getById: ctrlWrapper(getById),
	updateById: ctrlWrapper(updateById),
	deleteById: ctrlWrapper(deleteById), //FIXME: delete all from cards list
	updateColumns: ctrlWrapper(updateColumns),
	addColumn: ctrlWrapper(addColumn),
};
