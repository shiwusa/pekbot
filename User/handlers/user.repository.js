import {User} from "../../DB/models/index.js";

class UserRepository {
    async doExistById(id) {
        return await User.exists({user_id: id});
    }
}

export default new UserRepository();