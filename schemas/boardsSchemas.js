import Joi from "joi";

const iconSchema = Joi.number().integer().min(0).max(7);
const backgroundSchema = Joi.number().integer().min(0).max(15);

const boardAdd = Joi.object({
	title: Joi.string().required(),
	icon: iconSchema.required(),
	background: backgroundSchema.required(),
});

const boardUpdate = Joi.object({
	title: Joi.string(),
	icon: iconSchema,
	background: backgroundSchema,
});

const columnSchema = Joi.object({
	title: Joi.string().required(),
});

// update columns list // TODO: only for drag-n-drop
const boardUpdateColumns = Joi.object({
	columns: Joi.array().items(columnSchema).required(),
});

const prioritySchema = Joi.number().integer().min(0).max(3);
const deadlineSchema = Joi.date().greater("now").iso();
const cardAdd = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	priority: prioritySchema.required(),
	deadline: deadlineSchema.required(),
});

const cardUpdate = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	priority: prioritySchema.required(),
	deadline: deadlineSchema.required(),
});

const cardMove = Joi.object({
	newOwnerId: Joi.string().required(), // TODO: isValidID ??
});

export default {
	boardAdd,
	boardUpdate,
	boardUpdateColumns,
	columnSchema,
	cardAdd,
	cardUpdate,
	cardMove,
};
