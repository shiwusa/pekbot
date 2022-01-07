const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const Scene = require("telegraf/scenes/base");
//const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const { enter, leave } = Stage;

const {LoveParrot} = require("../DB/models");
const {KaParrot} = require("../DB/models");
const {CaiqParrot} = require("../DB/models");
const {User} = require("../DB/models");


const nameScene = new Scene('name');

nameScene.enter(async (ctx) => {
    await ctx.reply('Enter name for your parrot: ');
});

nameScene.on('text', async (ctx) => {
    return ctx.scene.enter("species", { name: ctx.message.text });
});

const specScene = new Scene('species');

specScene.enter(async (ctx) => {
    await ctx.reply ("Choose species for your parrot: ", Markup.keyboard(["Lovebird", "Kakariki", "Caique"]).oneTime().resize().extra());
});

specScene.on('text', async (ctx) =>{
    ctx.session.name = ctx.scene.state.name;
    await ctx.reply("Your info: species: " + ctx.message.text + ", name: " + ctx.session.name);

    const user = new User({
        user_id: `${ctx.from.id}`,
        _username: `${ctx.message.from.username}`,
    })
    await ctx.reply("You have been registered");
    await user.save()
        .then(user => console.log(user))
        .catch(e => console.log(e));
    if (ctx.message.text === "Lovebird") {
        const lovepek = new LoveParrot({
            owner_id: ctx.from.id,
            pek_name: ctx.session.name,
            pek_species: true,
        });
        await lovepek.save()
            .then(pek => console.log(pek))
            .catch(e => console.log(e));
    } else if (ctx.message.text === "Kakariki") {
        const kapek = new KaParrot({
            owner_id: ctx.from.id,
            pek_name: ctx.session.name,
            pek_species: true,
        });
        await kapek.save()
            .then(pek => console.log(pek))
            .catch(e => console.log(e));
    } else if (ctx.message.text === "Caique") {
        const capek = new CaiqParrot({
            owner_id: ctx.from.id,
            pek_name: ctx.session.name,
            pek_species: true,
        });
        await capek.save()
            .then(pek => console.log(pek))
            .catch(e => console.log(e));
    } else {
        await ctx.reply("invalid class");
    }
    return ctx.scene.leave;
});


module.exports = {nameScene, specScene}
