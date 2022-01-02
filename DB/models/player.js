const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
    user_id: { type: Number, unique: true, required: [true, "can't be blank"], index: true },
    username: { type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true },
    is_bot: { type: Boolean, default: false },
    is_verified: { type: Boolean, default: false },
    is_blocked: { type: Boolean, default: false }
})

UserSchema.plugin(uniqueValidator, {
    message: 'already exist!'
})
UserSchema.index({ user_id: 1 }, { unique: true })
UserSchema.index({ username: 1 }, { unique: true })

module.exports = mongoose.model('User', UserSchema)
