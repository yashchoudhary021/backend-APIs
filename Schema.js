let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    is_completed: {
        type: Boolean,
        default: false
    }
})

let userData = mongoose.model("myBackend", userSchema);

module.exports = userData;