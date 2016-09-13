var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    phone: String,
    bio: String,
    accountCreatedDate: { type: Date, default: Date.now },
    belongsTo: [ mongoose.Schema.ObjectId ]
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
}
