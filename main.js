const TOKEN = require ("./token");
const { Telegraf } = require("telegraf");
const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const Scene = require("telegraf/scenes/base");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const { enter, leave } = Stage;
const bot = new Telegraf(TOKEN);
//const query = require("./controllers/query");
//const {users} = require("./DB/db");
require("./DB/db");
const scene = require("./Scenes/registr");
//const {findUser} = require("./controllers/query");

const replierClass = require("./pekBase");
const {Parrot} = require("./DB/models");
const {User} = require("./DB/models");


const replier = new replierClass();

const stage = new Stage([scene.nameScene, scene.specScene], { ttl: 10 })

bot.use(session())
bot.use(stage.middleware())

//hears
bot.hears(/^какой я сегодня папуга$/i, async (ctx) => {
    const res = replier.onWhichParrot(ctx.message.from.username);
    const img = res[0];
    const txt = res[1];
    await ctx.replyWithPhoto(img, {caption: txt});
});
//command
bot.command('register', (ctx) => ctx.scene.enter('name'));
bot.command("getid", async (ctx) => {
    await ctx.reply(ctx.message.message_id);
});
bot.command("start", async (ctx) => {
    await ctx.reply("Hi there😳\nThis is my course work\nPlease, be patient");
});

//from db
bot.command("showMe", async (ctx) =>{
    let id = ctx.from.id;
    User.findOne({user_id: id}, 'user_id _username _id',  function (err, user) {
        if (err) return (err);
        ctx.reply(`Your telegram id: ${user.user_id},\nyour username: ${user._username},\nyour id in db: ${user._id}`);
    });
});

bot.command("deleteMe", async (ctx) =>{
    let id = ctx.from.id;
    User.findOneAndDelete({owner_id: id},  function (err, user) {
        if (err) return (err);
        ctx.reply(`You was removed from db`);
    });
});

bot.command("showParrot", async (ctx) =>{
    let id = ctx.from.id;
    Parrot.findOne({owner_id: id}, 'owner_id pek_name pek_species',  function (err, pek) {
        if (err) return (err);
        ctx.reply(`Your telegram id: ${pek.owner_id},\nyour parrot name: ${pek.pek_name},\nyour parrot species: ${pek.pek_species}`);
    });
});

bot.command("deleteParrot", async (ctx) =>{
    let id = ctx.from.id;
    Parrot.findOneAndDelete({owner_id: id},  function (err, pek) {
        if (err) return (err);
        ctx.reply(`Your was parrot removed from db`);
    });
});
//add photos to db //takoe
//add comm for parrots
//add comm for admin
bot.launch()
