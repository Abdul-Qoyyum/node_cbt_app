const mongoose = require('mongoose');

module.exports = mongoose.model('Result', new mongoose.Schema({
    _creator : {
        required : true,
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    _subject : {
        required : true,
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subject'
    },
    score : {
        default : 0,
        type : Number
    },
    created_at : {
        type : Date,
        default : Date.now
    }
}));