import {User} from "../../DB/models/index.js";
import Logger from "../../controllers/logger.js";

class UserRepository {
    async doExistById(id) {
        return await User.exists({user_id: id});
    }

    async getUserById(id) {
        User.findOne(
            {user_id: id},
            "user_id _username _id",
            async function (err, user) {
                if (err) Logger.error(err);
            }
        );
    }

    async deleteUserById(id) {
        User.findOneAndDelete({owner_id: id}, async function (err) {
            if (err) Logger.error(err);
        });
    }

    async createUser(userObj) {
        const user = new User(userObj);
        await user
            .save()
            .then((user) => console.log(user))
            .catch(Logger.error);
    }
}
export default new UserRepository();