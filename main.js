const TOKEN = require ("./token");
const { Composer, Markup, Scenes, session, Telegraf } = require("telegraf");
const bot = new Telegraf(TOKEN);
const { enter, leave } = Scenes.Stage;
const mongoose = require('mongoose');
require("./DB/models/index");
require("./DB/db");

const replierClass = require("./pekBase");

const replier = new replierClass();

bot.command("getid", async (ctx) => {
    await ctx.reply(ctx.message.message_id);
});

bot.command("start", async (ctx) => {
    await ctx.reply("Hi there😳\nThis is my course work\nPlease, be patient");
});

bot.hears(/^какой я сегодня папуга$/i, async (ctx) => {
    const res = replier.onWhichParrot(ctx.message.from.username);
    const img = res[0];
    const txt = res[1];
    await ctx.replyWithPhoto(img, {caption: txt});
});

const User = mongoose.model ('users');

bot.hears(/^register$/i, async (ctx) => {
    const user = new User({
        user_id: `${ctx.message.from.id}`,
        _username: `${ctx.message.from.username}`,
        pek_name: "poka cto tak"
    })
    await ctx.reply("You have been registered with " + user);
    await user.save()
        .then(user => console.log(user))
        .catch(user => console.log(user))
});


bot.launch();
