const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    user_id: { type: Number, unique: true, required: [true, "can't be blank"], index: true },
    _username: { type: String, unique: true, index: true },
    is_bot: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_blocked: { type: Boolean, default: false },
});

module.exports = mongoose.model("users", UserSchema);
