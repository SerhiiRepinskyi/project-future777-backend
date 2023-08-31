import { isValidObjectId } from "mongoose";

import { HttpError } from "../helpers/index.js";

const isValidId = (req, res, next) => {
	console.debug("isValidId>>>");
	const { id } = req.params;
  if (!isValidObjectId(id)) {
		console.debug("isValidId>>> NO!");
		next(HttpError(404, `${id} is not valid id`));
	}
	next();
};

export default isValidId;
