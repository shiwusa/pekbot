const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PekSchema = new Schema({
    owner_id: { type: Schema.Types.ObjectId, ref: 'users' },
    pek_name: {type: String, required: [true, "can't be blank"], index: true},
    pek_species: {type: String, required: [true, "can't be blank"], index: true },
    pek_class: {type: String, required: [true, "can't be blank"], index: true}
});

module.exports = mongoose.model('parrots', PekSchema);
