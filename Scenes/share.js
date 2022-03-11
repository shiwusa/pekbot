import BaseScene from "telegraf/scenes/base.js";
import {Parrot} from "../DB/models/index.js";
import UserService from "../User/handlers/user.service.js";
import PekService from "../Pek/handlers/pek.service.js";

const shareScene = new BaseScene("share");
const amountScene = new BaseScene("amount");

shareScene.enter(async (ctx) => {
    if (await UserService.doExistById(ctx.from.id)) {
        await ctx.reply("Enter the name of parrot you want to share seeds with:");
    } else {
        await ctx.reply("Smth went wrong... check info or try /register");
        await ctx.scene.leave();
    }
});

shareScene.on("text", async (ctx) => {
    if (await PekService.doExistByName(ctx.message.text)) {
        return ctx.scene.enter("amount", { name: ctx.message.text });
    } else {
        await ctx.reply("Smth went wrong... check info or try /register");
        await ctx.scene.leave();
    }
});

amountScene.enter(async (ctx) => {
    await ctx.reply("Write amount of seeds:");
});

amountScene.on("text", async (ctx) => {
    ctx.session.name = ctx.scene.state.name;
    /* beginning */ //TODO: pek service and repository
    const amountSender = await Parrot.findOne({ owner_id: ctx.from.id });
    amountSender.seeds -= parseInt(ctx.message.text);
    if (amountSender.seeds > 0) {
        await amountSender.save();
        const amountReceiver = await Parrot.findOne({ pek_name: ctx.session.name });
        amountReceiver.seeds += parseInt(ctx.message.text);
        await amountReceiver.save();
        await ctx.reply("Seeds were sent");
    } else {
        await ctx.reply("You don`t have enough seeds");
    }
    /* end */
    await ctx.scene.leave();
});

export default { shareScene, amountScene };
