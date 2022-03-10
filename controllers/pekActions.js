import {Parrot} from "../DB/models";

export class ParrotActions {
    async static feed(id) {
        let amount = await Parrot.findOne({owner_id: id});
        amount.seeds += 50;
        await amount.save();
    }

    async static doExistById(id) {
        return await Parrot.exists({owner_id: id});
    }

    async static doExistByName(name) {
        return await Parrot.exists({pek_name: name});
    }
}