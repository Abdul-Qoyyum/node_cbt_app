const validator = require("validator");

const { User } = require('../models');

module.exports  =  function(req,res,next){
    let token = req.header('emstoken');
    console.log(`Ems : ${token}`);
    if(!token || !validator.isJWT(token)) return res.status(401).json("Not authenticated");
    User.findByToken(token).then(user => {
        req.user = user;
        req.token = token;
        next();
    }).catch(err => {
        next(err);
    });
  }
