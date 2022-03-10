import TOKEN from "./token";
import {Telegraf, Markup, Stage, session} from "telegraf";
import replierClass from "./controllers/pekBase";
import scene from "./Scenes/registr";
import scene1 from "./Scenes/share";
import {UserActions} from "./controllers/userActions";
import {ParrotActions} from "./controllers/pekActions";
import { Parrot, User } from"./DB/models";
import "./DB/db";

const ACTION_TYPES = {
    remove: "remove",
};

const bot = new Telegraf(TOKEN);
const replier = new replierClass();
const stage = new Stage(
    [scene.nameScene, scene.specScene, scene1.shareScene, scene1.amountScene],
    { ttl: 1000 }
);

bot.use(session());
bot.use(stage.middleware());

//hears
bot.hears(/^какой я сегодня папуга$/i, async (ctx) => {
    const res = replier.onWhichParrot(ctx.message.from.username);
    const img = res[0];
    const txt = res[1];
    await ctx.replyWithPhoto(img, { caption: txt });
});

//commands
bot.command("register", async (ctx) => {
    const id = ctx.from.id;
    if (await UserActions.userRegist(id)) {
        await ctx.reply("You are already registered");
    } else {
        await ctx.scene.enter("name");
    }
});

bot.command("getid", async (ctx) => {
    await ctx.reply(ctx.message.message_id);
});

bot.command("start", async (ctx) => {
    await ctx.reply("Hi there😳\nThis is my course work\nPlease, be patient");
});

//from db
bot.command("showme", async (ctx) => {
    const id = ctx.from.id;
    if (await UserActions.userRegist(id)) {
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

bot.command("deleteme", async (ctx) => {
    let id = ctx.from.id;
    if (await UserActions.userRegist(id)) {
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

bot.command("showparrot", async (ctx) => {
    let id = ctx.from.id;
    if (await ParrotActions.pekExistById(id)) {
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

bot.command("feed", async (ctx) => {
    let id = ctx.from.id;
    if (await ParrotActions.pekExistById(id)) {
        await ctx.reply("Your birdie is eating... ");
        setTimeout(() => {
            ParrotActions.feedPek(id),
                ctx.reply("The parrot finished eating, added 50 seeds to your balance");
        }, 6 * 1000);
    } else {
        await ctx.reply("Who you gonna feed, buddy?\nTry /register first");
    }
});

bot.command("share", async (ctx) => {
    await ctx.scene.enter("share");
});

bot.action("callback_query", async (ctx) => {
    const actionType = ctx.callbackQuery.data;
    if (actionType === ACTION_TYPES.remove) {
        await ctx.reply("Removed", Markup.keyboard.remove());
    }
    return ctx.answerCbQuery();
});

bot.launch();
