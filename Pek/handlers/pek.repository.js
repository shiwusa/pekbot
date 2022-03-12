import {Parrot} from "../../DB/models/index.js";
import {FEED_EXPIRES_IN} from "../constant";

class PekRepository {
    async feed(id, seedsAmount) {
        const pek = await Parrot.findOne({owner_id: id});
        pek.seeds += seedsAmount;
        pek.fed_expire = Date.now() + FEED_EXPIRES_IN;
        await pek.save();
    }

    async getFedExpiration(id) {
        const {fed_expire: fedExpire} = await Parrot.findOne({owner_id: id});
        return fedExpire;
    }

    async doExistById(id) {
        return await Parrot.exists({owner_id: id});
    }

    async doExistByName(name) {
        return await Parrot.exists({pek_name: name});
    }
}

export default new PekRepository();