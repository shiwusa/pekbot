const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");

const {Parrot, User} = require("../DB/models");

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
    const spec = (ctx.message.text).toString()
    if ((spec === "Lovebird") || (spec ==="Kakariki") || (spec ==="Caique")) {
    const user = new User({
        user_id: `${ctx.from.id}`,
        _username: `${ctx.message.from.username}`,
    })
    await user.save()
        .then(user => console.log(user))
        .catch(e => console.log(e));
        const parrot = new Parrot({
            owner_id: ctx.from.id,
            pek_name: ctx.session.name,
            pek_species: ctx.message.text,
        });
        await parrot.save()
            .then(parrot => console.log(parrot))
            .catch(e => console.log(e));
        await ctx.reply("You have been registered");
        await ctx.reply("Your info: species: " + (ctx.message.text).toLowerCase() + ", name: " + ctx.session.name);
    } else {
        ctx.reply("Invalid class, try /register once more");
    }
    await ctx.scene.leave();
});

module.exports = {nameScene, specScene}
