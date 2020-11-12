const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
require('dotenv').config();


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
    access : {
     type : String,
     default : "auth"
    },
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
  if(user.isModified("password")){
   bcrypt.hash(user.password, 10,function(err,hash){
    if(err)return next(err);
    user.password = hash;
    next();
   });
  }else{
   next();
  }
});


UserSchema.methods.toJSON = function(){
    let user = this.toObject();
    let credentials = _.pick(user,['_id','email']);
    return credentials;
}


UserSchema.methods.generateAuthToken = function(remember_me = false){
    let user = this;
    let access = 'auth';

    let token = jwt.sign({
        _id : user._id,
        email : user.email
        },
        process.env.JWT_SECRET,
        //set a token that expires in 60 days if remember_me is true
        //token expires in 2 days by default if remember_me is false
        { expiresIn: remember_me ? '60d' : '2d' }
        );

    user.tokens = [{ access, token}];
    return user.save().then(res => {
        //return the saved token
        return res.tokens[0].token;
    }).catch(err => Promise.reject(err));
}

//Sign your token to expire after 30 days
//Create a function to delete expired tokens
//When the app loads

UserSchema.statics.findByToken = function(token){
    return this.findOne({'tokens.token' : token}).then(user => {
       return jwt.verify(token, process.env.JWT_SECRET,(err, decoded) => {
           if (err) return Promise.reject(err);
           return Promise.resolve(decoded);
       });
    }).catch(err => Promise.reject(err));
}


UserSchema.statics.findByCredentials = function({ email, password}){
  let model = this;
   return new Promise(function(resolve, reject){
     model.findOne({ email }).then(user => {
       bcrypt.compare(password, user.password, (err, res) => {
        res ? resolve(user) : reject(err);
     });
    }).catch(err => {
        reject(err);
     });
   });
}


module.exports = mongoose.model("User",UserSchema);
