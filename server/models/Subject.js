const mongoose = require("mongoose");

const Subject = mongoose.model('Subject', new mongoose.Schema({
    title : {
        type : String,
        required : true,
        unique : true
    },
    duration : {
        type : Number,
        required : true
    },
    _level : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Level",
        required : true
    }
}));

module.exports = Subject;