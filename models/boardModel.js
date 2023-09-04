import { Schema, model } from "mongoose";
import { handleMongooseError, validateAtUpdate } from "./hooks.js";
/*
 //TODO: removed
  icon: {
			type: Number, // 0..7
			default: 0,
		},
    backgroundURL: {
			type: String,
		},
    columns: [{ columnId: String, columnTitle: String }],
   */
const boardSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Board title is missing"],
    },
    iconId: {
      type: String, //just not empty
    },
    background: {
      type: Number, // 0 of 15 (0=none),
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user", // collection name
      required: true,
    },

    content: [{ type: Schema.Types.ObjectId, ref: "column" }], // "card" }], //FIXME: ???

		// TODO:  for future // isDeleted: { type: Boolean, default: false },
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
//TODO: add validation? i dont see any sense as we dont own the icons resource
// "icon-hexagon","icon-lightning", "icon-loading", "icon-Project",
// "icon-puzzle","icon-star", "icon-colors", "icon-container"
