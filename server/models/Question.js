const mongoose = require("mongoose");

const QuestionSchema =  new mongoose.Schema({
   body : {
       type : String,
       required : true,
   },
    options : [],
    answer : {
       type : String,
       required : true
    },
    _creator : {
       type: String,
        required : true
    }
});

QuestionSchema.statics.createOption = function(option){
  // let question = this;

}

module.exports =  mongoose.model('Question',QuestionSchema);