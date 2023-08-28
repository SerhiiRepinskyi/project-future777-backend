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
    background: {
      type: Number, // 0 of 15 (0=none),
      default: 0,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user", // collection name
      required: true,
    },
    columns: [{ columnId: String, columnTitle: String }], // TODO: ids???
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
