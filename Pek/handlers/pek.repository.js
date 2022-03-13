import {Parrot, User} from "../../DB/models/index.js";
import {FEED_EXPIRES_IN} from "../constant.js";
import Logger from "../../controllers/logger.js";

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

    async getPekByOwner(id) {
      Parrot.findOne(
           {owner_id: id},
           "owner_id pek_name pek_specie seeds",
           async function (err, pek) {
               if (err) Logger.error(err);
           }
       );
    }

    async deletePekById(id) {
        Parrot.findOneAndDelete({ owner_id: id }, async function (err) {
            if (err) Logger.error(err);
        });
    }

    async createPek(pekObj) {
        const parrot = new Parrot(pekObj);
        await parrot
            .save()
            .then((parrot) => console.log(parrot))
            .catch(Logger.error);
    }
}

export default new PekRepository();