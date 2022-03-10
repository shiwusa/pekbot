import { User } from "../DB/models";

export class UserActions {
    async static userRegist(id) {
        return await User.exists({user_id: id});
    }
}
