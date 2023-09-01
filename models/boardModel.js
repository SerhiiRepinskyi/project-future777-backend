import { Schema, model } from "mongoose";
import { handleMongooseError, validateAtUpdate } from "./hooks.js";

const boardSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "Board title is missing"],
		},
		icon: {
			type: Number, // 0..7
			default: 0,
		},
		iconId: {
			type: String, //any, there is no validation //TODO: remove either icon or iconId
		},
		background: {
			type: Number, // 0 of 15 (0=none),
			default: 0,
		},
		backgroundURL: {
			//TODO: remove either of background or backgroundURL
			type: String,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user", // collection name
			required: true,
		},
		columns: [{ columnId: String, columnTitle: String }], // TODO: ids???

		isDeleted: { type: Boolean, default: false },
		// FIXME: columnsList: {},
	},
	{ versionKey: false, timestamps: true }
);

// to validate before update
// (instead of settings object for findByIdAndUpdate)
boardSchema.pre("findOneAndUpdate", validateAtUpdate);

// additional action after save to DB operation:
boardSchema.post("save", handleMongooseError);
boardSchema.post("findOneAndUpdate", handleMongooseError);
boardSchema.post("findOneAndDelete", handleMongooseError);

const Board = model("board", boardSchema);

export default Board;

// "icon-hexagon","icon-lightning", "icon-loading", "icon-Project",
// "icon-puzzle","icon-star", "icon-colors", "icon-container"
