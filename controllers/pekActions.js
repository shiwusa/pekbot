const {Parrot} = require("../DB/models");

async function feedPek (id) {
    let amount = await Parrot.findOne({owner_id: id})
    amount.seeds += 50;
    await amount.save();
}

module.exports = {feedPek}
