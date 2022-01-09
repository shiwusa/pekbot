const { Parrot } = require("../DB/models");

async function feedPek(id) {
    let amount = await Parrot.findOne({ owner_id: id });
    amount.seeds += 50;
    await amount.save();
}

async function pekExistById(id) {
    return await Parrot.exists({ owner_id: id });
}

async function pekExistByName(name) {
    return await Parrot.exists({ pek_name: name });
}

module.exports = { feedPek, pekExistById, pekExistByName };
