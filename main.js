import {TOKEN} from "./config.js";
import Telegraf from "telegraf";
import Stage from "telegraf/stage.js";
import Markup from "telegraf/markup.js";
import session from "telegraf/session.js";
import RegisterScenes from "./Scenes/register.js";
import ShareScenes from "./Scenes/share.js";
import { Parrot, User } from"./DB/models/index.js";
import "./DB/db.js";
import PekService from "./Pek/handlers/pek.service.js";
import UserService from "./User/handlers/user.service.js";
import Logger from "./controllers/logger.js";
import {MINUTE_IN_MS} from "./Pek/constant.js";

const sessionToken = process.argv[2] ? process.argv[2] : TOKEN;
const bot = new Telegraf(sessionToken);
const stage = new Stage(
    [RegisterScenes.nameScene, RegisterScenes.specScene, ShareScenes.shareScene, ShareScenes.amountScene],
    { ttl: 1000 }
);

const ACTION_TYPES = {
    remove: "remove",
};

bot.use(session());
bot.use(stage.middleware());

//hears
bot.hears(/^какой я сегодня папуга$/i, PekService.whichParrot);

//commands
bot.command("register", UserService.beginRegistration);

bot.command("getid", async (ctx) => {
    await ctx.reply(`${ctx.message.message_id}`); //still here
});

bot.command("start", async (ctx) => {
    await ctx.reply("Hi there😳\nThis is my course work\nPlease, be patient"); //still here, will add TextDB later
});


bot.command("showme", UserService.showUser);

bot.command("deleteme", UserService.deleteUserById); //USER

bot.command("showparrot", PekService.showPek);

bot.command("feed", async (ctx) => { //PARROT
    const {id} = ctx.from;
    if (await PekService.doExistById(id)) {
        await ctx.reply("Your birdie is eating... ");
        setTimeout(async () => {
            await PekService.feed(id);
            await ctx.reply("The parrot finished eating, added 50 seeds to your balance");
        }, MINUTE_IN_MS);
    } else {
        await ctx.reply("Who you gonna feed, buddy?\nTry /register first");
    }
});

bot.command("share", async (ctx) => { //PARROT
    await ctx.scene.enter("share");
});

bot.action("callback_query", async (ctx) => { //still here, will add CBQueryService later
    const actionType = ctx.callbackQuery.data;
    if (actionType === ACTION_TYPES.remove) {
        await ctx.reply("Removed", Markup.keyboard.remove());
    }
    return ctx.answerCbQuery();
});

bot.catch((e) => Logger.error(e));

bot.launch()
    .then(() => {
        Logger.add(`Bot launched`)
    })
    .catch((e) => Logger.error(e));
