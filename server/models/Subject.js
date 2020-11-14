const mongoose = require("mongoose");

const Subject = mongoose.model('Subject', new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    duration : {
        type : Number,
        required : true
    },
    _level : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Level",
        required : true
    },
    _creator : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    created_at : {
        type : Date,
        default : Date.now
    }
}));

module.exports = Subject;
