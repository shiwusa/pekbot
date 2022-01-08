const {User} = require("../DB/models");

async function userRegist (id) {
    return await User.exists({user_id: id});
}

 module.exports ={userRegist}
