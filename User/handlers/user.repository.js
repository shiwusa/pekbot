import {User} from "../../DB/models";

export default class UserRepository {
    constructor() {
        //this.replier = new ReplierClass();
    }
    async doExistById(id) {
        return await User.exists({user_id: id});
    }

}