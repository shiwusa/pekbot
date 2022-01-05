const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CaiqPekSchema = new Schema({
    owner_id: { type: Schema.Types.ObjectId, ref: 'users' },
    pek_name: {type: String, required: [true, "can't be blank"], index: true},
    pek_species: {type: Boolean, required: [true, "can't be blank"], index: true}
});

module.exports = mongoose.model('caique parrots', CaiqPekSchema);
