var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Profile = new Schema({
    user: mongoose.Schema.ObjectId,
    profileCreatedDate: { type: Date, default: Date.now },
    about: String,
    facebook: String,
    instagram: String,
    bio: String,
    website: String,
});

module.exports = mongoose.model('Profile', Profile);
