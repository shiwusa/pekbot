import ReplierClass from "../../controllers/replier.js";
import PekRepository from "./pek.repository.js";

class PekService {
    async whichParrot (ctx) {
        const res = ReplierClass.onWhichParrot(ctx.message.from.username);
        await ctx.replyWithPhoto(res.img, { caption: res.text });
    }

    async getFedExpiration(id) {
        return PekRepository.getFedExpiration(id);
    }

    async feed(id, seedsAmount = 50) {
        const fedExpire = await this.getFedExpiration(id);
        const timeNow = Date.now();
        if (timeNow < fedExpire) {
            //await ctx.reply(`You cannot feed ur pek yet!`);
        }
        await PekRepository.feed(id, seedsAmount);
    }

    async doExistById(id) {
        return PekRepository.doExistById(id);
    }

    async doExistByName(name) {
        return PekRepository.doExistByName(name);
    }

    async getPekByOwner(id) {
    return PekRepository.getPekByOwner(id);
    }

    async showPek (ctx) {
        const {id} = ctx.from;
        if (await this.doExistById(id)) {
            const pek = await this.getPekByOwner(id);
            await ctx.reply(`Your parrot name: ${pek.pek_name},\nparrot specie: ${pek.pek_specie.toLowerCase()},\nbalance: ${pek.seeds} seeds`);
        } else {
            await ctx.reply("You don`t have parrot...");
        }
    }

    async createPek(pekObj) {
        await PekRepository.createPek(pekObj)
    }

    async updatePek (id, obj) {
        return PekRepository.updatePek(id, obj);
    }

    async updatePekName (ctx) {
        const text = ctx.message.text.toString();
        const name = text.slice(14, text.length);
        const {id} = ctx.from;
        const updObj = {
            pek_name: name,
        }
        await this.updatePek(id,updObj);
        await ctx.reply("Name was updated");
    }
}

export default new PekService();