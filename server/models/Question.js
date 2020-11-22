const mongoose = require("mongoose");

const QuestionSchema =  new mongoose.Schema({
   body : {
       type : String,
       required : true,
   },
    options : Object,
    answer : {
       type : String,
       required : true
    },
    selectedAnswer : String,
    _subject : {
       type : mongoose.Schema.Types.ObjectId,
       ref : "Subject",
       required : true
    },
    _creator : {
       type: mongoose.Schema.Types.ObjectId,
       ref : "User",
       required : true
    }
});

module.exports =  mongoose.model('Question',QuestionSchema);
