import {Parrot} from "../DB/models";

export class ParrotActions {
    async static feedPek(id) {
        let amount = await Parrot.findOne({owner_id: id});
        amount.seeds += 50;
        await amount.save();
    }

    async static pekExistById(id) {
        return await Parrot.exists({owner_id: id});
    }

    async static pekExistByName(name) {
        return await Parrot.exists({pek_name: name});
    }
}