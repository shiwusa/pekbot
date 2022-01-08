const {Parrot} = require("../DB/models");

async function feedPek (id) {
    let amount = await Parrot.findOne({owner_id: id})
    amount.seeds += 50;
    await amount.save();
}

async function pekExist (id) {
    return await Parrot.exists({owner_id: id});
}

module.exports = {feedPek, pekExist}
