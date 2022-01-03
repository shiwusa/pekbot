const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const ParrotSchema = new Schema({
    owner_id: { type: Number, unique: true, required: [true, "can't be blank"], index: true },
    owner_username: { type: String, unique: true, index: true },
    is_bot: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_blocked: { type: Boolean, default: false },
    pek_name: {type: String, required: [true, "can't be blank"], index: true}
});

module.exports = mongoose.model('parrots', ParrotSchema);
