import { Schema, model } from "mongoose";
import { handleMongooseError, validateAtUpdate } from "./hooks.js";

const columnSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		owner: {
			type: Schema.Types.ObjectId,
			ref: "board", // collection name
			required: true,
		},
		cards: [{ type: Schema.Types.ObjectId, ref: "card" }],
		// TODO: for future // isDeleted: { type: Boolean, default: false },
	},
	{ versionKey: false, timestamps: true }
);

// to validate before update
// (instead of settings object for findByIdAndUpdate)
columnSchema.pre("findOneAndUpdate", validateAtUpdate);

// additional action after save to DB operation:
columnSchema.post("save", handleMongooseError);
columnSchema.post("findOneAndUpdate", handleMongooseError);
columnSchema.post("findOneAndDelete", handleMongooseError);

const Column = model("column", columnSchema);

export default Column;
