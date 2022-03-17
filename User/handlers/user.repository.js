import {User} from "../../DB/models/index.js";
import LoggerService from "../../Logger/logger.service.js";

class UserRepository {
    async doExistById(id) {
        return await User.exists({user_id: id});
    }

    async getUserById(id) {
        User.findOne(
            {user_id: id},
            "user_id _username _id"
        ).catch(LoggerService.error);
    }

    async deleteUserById(id) {
        User.findOneAndDelete({owner_id: id}).catch(LoggerService.error);
    }

    async createUser(userObj) {
        const user = new User(userObj);
        await user
            .save()
            .then((user) => console.log(user))
            .catch(LoggerService.error);
    }
}
export default new UserRepository();