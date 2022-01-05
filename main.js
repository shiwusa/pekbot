const TOKEN = require ("./token");
const { Telegraf } = require("telegraf");
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const Scene = require("telegraf/scenes/base");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const { enter, leave } = Stage;
const bot = new Telegraf(TOKEN);

require("./DB/db");
const scene = require("./Scenes/registr");

const replierClass = require("./pekBase");
const replier = new replierClass();

const stage = new Stage([scene.nameScene, scene.specScene], { ttl: 10 })

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

bot.use(session())
bot.use(stage.middleware())
bot.command('register', (ctx) => ctx.scene.enter('name'))

bot.launch();
