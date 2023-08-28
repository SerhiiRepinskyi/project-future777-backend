import { Schema, model } from "mongoose";
import { handleMongooseError, validateAtUpdate } from "./hooks.js"; // TODO: update

const cardSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: {
      type: Number, // 0 of 3 // TODO: ? is there a need to limit?
      required: true,
    },
    deadline: { type: Date, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "column", // collection name
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// to validate before update
// (instead of settings object for findByIdAndUpdate)
cardSchema.pre("findOneAndUpdate", validateAtUpdate);

// additional action after save to DB operation:
cardSchema.post("save", handleMongooseError);
cardSchema.post("findOneAndUpdate", handleMongooseError);
cardSchema.post("findOneAndDelete", handleMongooseError);

const Card = model("card", cardSchema);

export default Card;
