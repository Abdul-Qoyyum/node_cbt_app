const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email : {
   type : String,
   required : [ true, 'Email is required'],
   unique : [ true, 'Account already exist'],
   validate : {
     validator : function(v){
       return validator.isEmail(v);
      },
     message : props => 'Invalid email format'
    }
  },
  password : {
   type : String,
   required : [ true, "Password is required"],
   minlength : [6, "Password is too short"]
  },
  tokens : [
   {
    access : String,
    token : {
     type : String,
     validate : {
      validator : function(v){
        return validator.isJWT(v);
      },
      message : props => "Invalid token format"
     }
    }
   }
  ]
});


UserSchema.pre('save',function(next){
  let user = this;
   bcrypt.genSalt(10,function(err, salt){
     if(err)return next(err);
    bcrypt.hash(user.password,salt,function(err, hash){
     if(err)return next(err);
      user.password = hash;
      next();
    });
   });
});

module.exports = mongoose.model("User",UserSchema);
