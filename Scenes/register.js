import {BaseScene, Markup} from "telegraf";
import {Parrot, User} from "../DB/models";
import {PARROT_TYPES} from "../Pek/constant";

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
        "Choose species for your parrot: ",
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
        /* beginning */  //TODO: user repository
        const user = new User({
            user_id: `${ctx.from.id}`,
            _username: `${ctx.message.from.username}`,
        });
        await user
            .save()
            .then((user) => console.log(user))
            .catch((e) => console.log(e));
        /* end */
        /* beginning */  //TODO: pek repository
        const parrot = new Parrot({
            owner_id: ctx.from.id,
            pek_name: ctx.session.name,
            pek_species: ctx.message.text,
        });
        await parrot
            .save()
            .then((parrot) => console.log(parrot))
            .catch((e) => console.log(e));
        /* end */
        await ctx.reply("You have been registered");
        await ctx.reply(
            "Your info: species: " +
            ctx.message.text.toLowerCase() +
            ", name: " +
            ctx.session.name
        );
    } else {
        await ctx.reply("Invalid class, try /register once more");
    }
    await ctx.scene.leave();
});

export default { nameScene, specScene };
