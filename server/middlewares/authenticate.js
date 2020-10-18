const validator = require("validator");

const { User } = require('../models');

module.exports  =  function(req,res,next){
    let token = req.header('x-auth');
    if(!token || !validator.isJWT(token)) return res.status(400).json("Bad Request");
    User.findByToken(token).then(user => {
        req.user = user;
        next();
    }).catch(err => {
        next(err);
    });
  }
