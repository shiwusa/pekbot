const Scene = require("telegraf/scenes/base");
const use = require("../controllers/userActions");
const pek = require("../controllers/pekActions");

const { Parrot } = require("../DB/models");

const shareScene = new Scene("share");
const amountScene = new Scene("amount");

shareScene.enter(async (ctx) => {
    if (await use.userRegist(ctx.from.id)) {
        await ctx.reply("Enter the name of parrot you want to share seeds with:");
    } else {
        await ctx.reply("Smth went wrong... check info or try /register");
        await ctx.scene.leave();
    }
});

shareScene.on("text", async (ctx) => {
    if (await pek.pekExistByName(ctx.message.text)) {
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
    const amountSender = await Parrot.findOne({ owner_id: ctx.from.id });
    amountSender.seeds -= parseInt(ctx.message.text);
    if (amountSender.seeds > 0) {
        await amountSender.save();
        const amountReciever = await Parrot.findOne({ pek_name: ctx.session.name });
        amountReciever.seeds += parseInt(ctx.message.text);
        await amountReciever.save();
        await ctx.reply("Seeds were sent");
    } else {
        await ctx.reply("You don`t have enough seeds");
    }
    await ctx.scene.leave();
});

module.exports = { shareScene, amountScene };
