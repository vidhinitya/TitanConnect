var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Account = new Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String }, //, required: true},
    password: String,
    belongsTo: [{ type: Schema.ObjectId, default: []}],
});

module.exports = mongoose.model('Account', Account);
