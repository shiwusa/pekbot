const mongoose = require("mongoose");
require("./parrot");
require("./user");

const User = mongoose.model("users");
const Parrot = mongoose.model("parrots");

module.exports = {
    User,
    Parrot,
};
