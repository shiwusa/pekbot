const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const KaPekSchema = new Schema({
    owner_id: { type: Schema.Types.ObjectId, ref: 'users' },
    pek_name: {type: String, required: [true, "can't be blank"], index: true, unique: true},
    pek_species: {type: Boolean, required: [true, "can't be blank"], index: true}
});

module.exports = mongoose.model('kakariki parrots', KaPekSchema);
