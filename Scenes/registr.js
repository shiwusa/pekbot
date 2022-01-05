const session = require("telegraf/session");
const Stage = require("telegraf/stage");
const Scene = require("telegraf/scenes/base");
const Extra = require("telegraf/extra");
const Markup = require("telegraf/markup");
const { enter, leave } = Stage;
const mongoose = require('mongoose');
require("../DB/models/index");

const User = mongoose.model ('users');
const Pek = mongoose.model ('parrots');


const nameScene = new Scene('name');

nameScene.enter(async (ctx) => {
    await ctx.reply('Enter name for your parrot: ');
});

nameScene.on('text', async (ctx) => {
    return ctx.scene.enter("species", { name: ctx.message.text });
});


const specScene = new Scene('species');

specScene.enter(async (ctx) => {
    await ctx.reply ("Choose species for your parrot: ", Markup.keyboard(["N", "K", "V"]).oneTime().resize().extra());
});

specScene.on('text', async (ctx) =>{
    ctx.session.name = ctx.scene.state.name;
    return ctx.scene.enter("class", {spec: ctx.message.text});
});


const classScene = new Scene ('class');

classScene.enter(async (ctx) => {
    await ctx.reply ("Choose class for your parrot: ", Markup.keyboard(["A", "B", "C"]).oneTime().resize().extra());
});

classScene.on('text', async (ctx) => {
    ctx.session.spec = ctx.scene.state.spec;
    await ctx.reply("Your info: species: " + ctx.session.spec + ", name: " + ctx.session.name + ", class: " + ctx.message.text);

    const user = new User({
        user_id: `${ctx.message.from.id}`,
        _username: `${ctx.message.from.username}`,
    })
    await ctx.reply("You have been registered");
    await user.save()
        .then(user => console.log(user))
        .catch(e => console.log(e));

    const pek = new Pek ({
        pek_name: ctx.session.name,
        pek_class: ctx.message.text,
        pek_species: ctx.session.spec
    });
    await pek.save()
        .then(pek => console.log(pek))
        .catch(e => console.log(e));
    return ctx.scene.leave;
});

module.exports = {nameScene, specScene, classScene}
