const mongoose = require('mongoose');
require('./lovePek');
require('./kaPek');
require('./caiqPek')
require ('./user');

const User = mongoose.model ('users');
const LoveParrot = mongoose.model ('love parrots');
const KaParrot = mongoose.model ('kakariki parrots');
const CaiqParrot = mongoose.model ('caique parrots');

module.exports = {
    LoveParrot,
    User,
    KaParrot,
    CaiqParrot
}
