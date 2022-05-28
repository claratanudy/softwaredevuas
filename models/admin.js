const mongoose = require ('mongoose');
const adminSchema = new mongoose.Schema({
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
module.exports = mongoose.model("AdminData", adminSchema, 'Admin');
