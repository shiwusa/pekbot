import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PekSchema = new Schema({
    owner_id: { type: Number, unique: true, required: [true, "can't be blank"], index: true },
    pek_name: {type: String, required: [true, "can't be blank"], index: true, unique: true},
    pek_specie: {type: String, required: [true, "can't be blank"], index: true},
    seeds: {type: Number, default: 0, required: false, index: true}
});

export default mongoose.model("parrots", PekSchema);
