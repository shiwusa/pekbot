import UserRepository from "./user.repository.js";

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
}

export default new UserService();