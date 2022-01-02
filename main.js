const TOKEN = require ("./token");
const { Composer, Markup, Scenes, session, Telegraf } = require("telegraf");
const bot = new Telegraf(TOKEN);
const { enter, leave } = Scenes.Stage;
const mongoose = require('mongoose');
const mongoConnect = require('./DB/db').mongoConnect;


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

bot.launch();

mongoConnect(() => {
    app.listen(3000, () => {
        try {
            if(bot.launch()) {
                console.log('Bot is online and Server are listening on http://localhost:3000');
            }
        } catch(err) {
            console.log(err);
            next(err);
        }
    });
});

