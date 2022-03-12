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
}

export default new PekService();