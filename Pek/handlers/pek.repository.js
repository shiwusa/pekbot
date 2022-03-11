import {Parrot} from "../../DB/models/index.js";

class PekRepository {
    async feed(id, seedsAmount) {
        let amount = await Parrot.findOne({owner_id: id});
        amount.seeds += seedsAmount;
        await amount.save();
    }

    async doExistById(id) {
        return await Parrot.exists({owner_id: id});
    }

    async doExistByName(name) {
        return await Parrot.exists({pek_name: name});
    }
}

export default new PekRepository();