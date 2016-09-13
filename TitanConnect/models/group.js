var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var GroupsSchema = new mongoose.Schema({
    groupName: { type: String, required: true},
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

var Group = mongoose.model('Group', GroupsSchema);

module.exports = {
  Group: Group
}
