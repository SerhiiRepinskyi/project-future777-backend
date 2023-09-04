import Card from "../models/cardModel.js";
import Column from "../models/columnModel.js";
import Board from "../models/boardModel.js";

// ** delete card by id
export const deleteCard = async (id, isDeleteColumn) => {
	const card = await Card.findById(id);

	if (!card) {
		return false;
	}

	if (!isDeleteColumn) {
		const { owner } = card;
		const column = await Column.findById(owner._id);
		if (column !== null) {
			await column.cards.pull(id);
      await column.save();
      console.log("deleteCard>>Owner list", column, owner._id);
		} else {
			console.log("deleteCard>>Owner document is deleted", column, owner._id);
		}
	}

	await Card.findByIdAndDelete(id);
	return true;
};

// ** delete column by id
export const deleteColumn = async (id, isDeleteBoard) => {
	const columnToDelete = await Column.findById(id);

	if (!columnToDelete) {
		return false;
	}

	const { owner, cards } = columnToDelete;
	if (!isDeleteBoard) {
		const board = await Board.findById(owner._id);
		console.log("column delete>>board cards", owner, cards);
		if (board !== null) {
			// remove from owner's list
			await board.content.pull(id);
			await board.save();
			console.log("column delete>>board saved", board);
		} else {
			console.log("column delete>>Owner document is deleted");
		}
	}
	cards.forEach((el) => {
		console.log("deleteById>>>card", el._id);
		deleteCard(el._id, true);
	});

	await Column.findByIdAndDelete(id);

	return true;
};

export const deleteBoard = async (id) => {
	//FIXME:
	const boardToDelete = await Board.findById(id);
	/* //TODO: for future (delete job)
    Column.findByIdAndUpdate(id, {isD eleted: true,}); */

	if (!boardToDelete) {
		return false;
	}

	const { content } = boardToDelete;
	// TODO: for future user boards field
	/* 	const board = await Board.findById(owner._id);
	console.log("column delete>>board cards", owner, cards);

	if (board !== null) {
		// remove from owner's list
		await board.content.pull(id);
		await board.save();
		console.log("column delete>>board saved", board);
	} else {
		console.log("Own er document is deleted");
	} */
	try {
		content.forEach((el) => {
			console.log("deleteById>>>column", el._id);
			deleteColumn(el._id, true);
		});
	} catch (err) {
		console.error("No column found");
	}

	const result = await Board.findByIdAndDelete(id);
	return true;
};
