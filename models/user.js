const mongoose = require ('mongoose');
const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    role: {
        type: Number
    }
});
module.exports = mongoose.model("UserData", userSchema, 'User');
