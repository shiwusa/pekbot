import UserRepository from "./user.repository.js";
import {Parrot, User} from "../../DB/models/index.js";
import pekRepository from "../../Pek/handlers/pek.repository.js";
import userRepository from "./user.repository.js";
import PekRepository from "../../Pek/handlers/pek.repository.js";

class UserService {
    async doExistById(id) {
        return UserRepository.doExistById(id);
    }
    async beginRegistration(ctx) {
        const {id} = ctx.from;
        const user = await UserRepository.doExistById(id);
        if (!user) {
            await ctx.scene.enter("name");
        } else {
            await ctx.reply("You are already registered");
        }
    }

    async getUserById (id) {
        return UserRepository.getUserById(id);
    }

    async showUser(ctx) {
        const {id} = ctx.from;
        if (await this.doExistById(id)) {
            const user = this.getUserById(id);
            await ctx.reply(`Your telegram id: ${user.user_id},\nyour username: @${user._username},\nyour id in db: ${user._id}`);
        } else {
            await ctx.reply("Try /register first");
        }
    }

    async deleteUserById(id, ctx) {
        if (await this.doExistById(id)) {
            await UserRepository.deleteUserById(id);
            await PekRepository.deletePekById(id);
            await ctx.reply("You and your parrot were removed from db")
        } else {
            await ctx.reply("You aren`t even registered...");
        }
    }

    async createUser(userObj) {
        await UserRepository.createUser(userObj)
    }
}

export default new UserService();