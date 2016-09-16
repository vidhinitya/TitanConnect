var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Group = new Schema({
    groupname: { type: String, required: true, unique: true},
    admin: mongoose.Schema.ObjectId,
    groupMembers: [ mongoose.Schema.ObjectId ],
    groupChat: [{
        author: mongoose.Schema.ObjectId,
        comment: String,
        timestamp: Date
    }],
    description: String,
    groupCreatedDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Group', Group);
