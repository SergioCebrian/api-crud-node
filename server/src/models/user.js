const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

/**
 * 'TypeError: function_name is not a function' when a method is invoked from controller: https://stackoverflow.com/questions/57233820/calling-methods-from-controllers-to-mongoose-schema-file-nodejs
 * 'bcrypt Error: data and hash arguments required': https://stackoverflow.com/questions/42241113/bcrypt-error-data-and-hash-arguments-required
 */

const userSchema = new Schema({
    username: String,
    email: { type: String, unique: true, lowercase: true },
    password: { type: String, select: false },
    role: { type: String, default: 'visitor', enum: ['admin', 'contributor', 'visitor'] },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
});

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

module.exports = model('User', userSchema);