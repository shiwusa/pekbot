import UserRepository from "./user.repository";
import {UserActions} from "../../controllers/userActions";


export default class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    async doExistById(id) {
        return this.userRepository.doExistById(id);
    }
    async beginRegistration(ctx) {
        const {id} = ctx.from;
        const user = await this.userRepository.doExistById(id);
        if (!user) {
            await ctx.scene.enter("name");
        } else {
            await ctx.reply("You are already registered");
        }
    }
}