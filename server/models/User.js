const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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


UserSchema.methods.toJSON = function(){
    let user = this.toObject();
    delete user.password;
    return user;
}


UserSchema.methods.generateAuthToken = function(){
    let user = this;
    let token = jwt.sign({_id : user._id, password : user.password}, 'secret');
    user.tokens = [{ access : "auth", token }];
    return user.save().then(res => {
        return res.tokens[0].token;
    }).catch(err => Promise.reject(err));
}

UserSchema.statics.findByToken = function(token){
    let user = this;
    return user.findOne({ 'tokens.token' : token},(err, doc) => {
        if(err) return Promise.reject(err);
        //verify jwt token before returning promise
        return Promise.resolve(doc);
    });
}

UserSchema.statics.findByCredentials = function({ email, password}){
   return this.findOne({ email }).then(user => {

   });
}

module.exports = mongoose.model("User",UserSchema);
