import BaseScene from "telegraf/scenes/base.js";
import Markup from "telegraf/markup.js";
import {Parrot, User} from "../DB/models/index.js";
import {PARROT_TYPES} from "../Pek/constant.js";
import PekService from "../Pek/handlers/pek.service.js";
import UserService from "../User/handlers/user.service.js";

const nameScene = new BaseScene("name");
const specScene = new BaseScene("species");

nameScene.enter(async (ctx) => {
    await ctx.reply("Enter a name for your parrot: ");
});

nameScene.on("text", async (ctx) => {
    return ctx.scene.enter("species", { name: ctx.message.text });
});

specScene.enter(async (ctx) => {
    await ctx.reply(
        "Choose specie for your parrot: ",
        Markup.keyboard(PARROT_TYPES)
            .oneTime()
            .resize()
            .extra()
    );
});

specScene.on("text", async (ctx) => {
    ctx.session.name = ctx.scene.state.name;
    const spec = ctx.message.text.toString();
    if (PARROT_TYPES.includes(spec)) {
        await UserService.createUser ({
            user_id: ctx.from.id,
            _username: ctx.message.from.username,
        });
        await PekService.createPek({
            owner_id: ctx.from.id,
            pek_name: ctx.session.name,
            pek_specie: spec,
        });
        await ctx.reply("You have been registered");
        await ctx.reply(
            "Your info: species: " +
            spec +
            ", name: " +
            ctx.session.name
        );
    } else {
        await ctx.reply("Invalid class, try /register once more");
    }
    await ctx.scene.leave();
});

export default { nameScene, specScene };
