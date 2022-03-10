import { User } from "../DB/models";

export class UserActions {
    async static register(id) {
        return await User.exists({user_id: id});
    }
}
