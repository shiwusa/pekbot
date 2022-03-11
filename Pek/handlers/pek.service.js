import ReplierClass from "../../controllers/replier";
import PekRepository from "./pek.repository";


export default class PekService {
    constructor() {
        this.replier = new ReplierClass();
        this.pekRepository = new PekRepository();
    }

    async whichParrot (ctx) {
        const res = this.replier.onWhichParrot(ctx.message.from.username);
        await ctx.replyWithPhoto(res.img, { caption: res.text });
    }

    async feed(id, seedsAmount = 50) {
        await this.pekRepository.feed(id, seedsAmount);
    }

    async doExistById(id) {
        return this.pekRepository.doExistById(id);
    }

    async doExistByName(name) {
        return this.pekRepository.doExistByName(name);
    }
}