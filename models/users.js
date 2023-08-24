import  {Schema, model} from "mongoose";
import { handleMongooseError, validateAtUpdate } from "../helpers/index.js";
import { emailRegexp } from "../constans/user-constans.js";

const usersSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    }

}, {versionKey: false, timestamps: true});

usersSchema.pre("findOneAndUpdate", validateAtUpdate);

usersSchema.post("save", handleMongooseError);
usersSchema.post("findOneAndUpdate", handleMongooseError);

const User = model("user", usersSchema);

export default User;