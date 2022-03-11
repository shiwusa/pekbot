import {TOKEN} from "./config";
import {Telegraf, Markup, Stage, session} from "telegraf";
import RegisterScenes from "./Scenes/register";
import ShareScenes from "./Scenes/share";
import { Parrot, User } from"./DB/models";
import "./DB/db";
import PekService from "./Pek/handlers/pek.service";
import UserService from "./User/handlers/user.service";
import Logger from "./controllers/logger";
const pekService = new PekService();
const userService = new UserService();
const bot = new Telegraf(TOKEN);
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
bot.hears(/^какой я сегодня папуга$/i, pekService.whichParrot);

//commands
bot.command("register", userService.beginRegistration);

bot.command("getid", async (ctx) => {
    await ctx.reply(`${ctx.message.message_id}`); //still here
});

bot.command("start", async (ctx) => {
    await ctx.reply("Hi there😳\nThis is my course work\nPlease, be patient"); //still here, will add TextDB later
});


bot.command("showme", async (ctx) => { //USER
    const {id} = ctx.from;
    if (await userService.doExistById(id)) {
        User.findOne(
            { user_id: id },
            "user_id _username _id",
            async function (err, user) {
                if (err) return err;
                await ctx.reply(`Your telegram id: ${user.user_id},\nyour username: @${user._username},\nyour id in db: ${user._id}`);
            }
        );
    } else {
        await ctx.reply("Try /register first");
    }
});

bot.command("deleteme", async (ctx) => { //USER
    let id = ctx.from.id;
    if (await userService.doExistById(id)) {
        User.findOneAndDelete({ owner_id: id }, function (err) {
            if (err) return err;
            ctx.reply(`You was removed from db`);
        });
        Parrot.findOneAndDelete({ owner_id: id }, function (err) {
            if (err) return err;
            ctx.reply(`Your parrot was removed from db`);
        });
    } else {
        await ctx.reply("You aren`t even registered...");
    }
});

bot.command("showparrot", async (ctx) => { //PARROT
    let id = ctx.from.id;
    if (await pekService.doExistById(id)) {
        Parrot.findOne(
            { owner_id: id },
            "owner_id pek_name pek_species seeds",
            function (err, pek) {
                if (err) return err;
                ctx.reply(`Your parrot name: ${pek.pek_name},\nparrot species: ${pek.pek_species.toLowerCase()},\nbalance: ${pek.seeds} seeds`);
            }
        );
    } else {
        await ctx.reply("You don`t have parrot...");
    }
});

bot.command("feed", async (ctx) => { //PARROT
    let id = ctx.from.id;
    if (await pekService.doExistById(id)) {
        await ctx.reply("Your birdie is eating... ");
        setTimeout(async () => {
            await pekService.feed(id);
            await ctx.reply("The parrot finished eating, added 50 seeds to your balance");
        }, 6 * 1000); //6 * 1000 is a magic number. TODO: add constant for it
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

bot.catch(Logger.error);

bot.launch()
    .then(() => {
        Logger.add(`Bot launched`)
    })
    .catch(Logger.error);
