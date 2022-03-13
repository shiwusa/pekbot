import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LogSchema = new Schema({
    ts: {type: Number, required: [true, "can't be blank"], index: true},
    type: {type: String, required: false, index: true},
    text: {type: String, required: false, index: true},
    user_id: { type: Number, required: false, index: true },
    chat_id: { type: Number, required: false, index: true },
    message: {type: String, required: false, index: true},
});

export default mongoose.model("logs", LogSchema);