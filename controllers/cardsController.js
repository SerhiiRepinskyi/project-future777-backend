import Card from "../models/cardModel.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const ERR_NOT_FOUND = (id) => `Card id=${id} not found`;

// ** get card by Id  NEW!
const getCardById = async (req, res) => {
    const { id } = req.params;
		const result = await Card.findById(
			id,
			"-owner -createdAt -updatedAt -__v"
		);
		if (!result) {
			throw HttpError(404, ERR_NOT_FOUND(id));
		}
		res.json(result);
}

// ** update card
const updateCard = async (req, res) => {
	const { id } = req.params;
	const result = await Card.findByIdAndUpdate(id, req.body, { new: true }); // =return updated
	if (!result) {
		throw HttpError(404, ERR_NOT_FOUND(id));
	}
	res.json(result);
};

// ** delete card
const deleteById = async (req, res) => {
	const { id } = req.params;
	const result = await Card.findByIdAndDelete(id);
	if (!result) {
		throw HttpError(404, ERR_NOT_FOUND(id));
  }

  res.json({
    message: "Card deleted( FIXME: delete from owner's list)",
});
};

// ** move card
/* router.patch("/cards/:id" */
const moveCard = async (req, res) => {
  throw HttpError(404, `id=${id} under construction FIXME:`);


  const { id } = req.params;
  const result = await Card.findByIdAndUpdate(id, req.body, {new: true, }); // =return updated
	if (!result) {
		throw HttpError(404, `id=${id}`);
	}
	res.json(result);
 throw HttpError(404, `TODO: id=${id}`);
}

export default {
  getCardById: ctrlWrapper(getCardById),
	updateCard: ctrlWrapper(updateCard),
	deleteById: ctrlWrapper(deleteById),
	moveCard: ctrlWrapper(moveCard),
};
