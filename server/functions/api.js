const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;

require("dotenv").config();

const db = require('../db');
const { User } = require('../models');
const { authenticate,
        validate
       } = require('../middlewares');

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

//Cloudinary Configurations
cloudinary.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key :  process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET
});



db.on('error',console.error.bind(console, 'Connection Error'));
db.once('open',() => {
 router.route('/api/register')
    .post(validate,function(req,res){
     let { email, password } = req.body;
      let user = new User({
          email,
          password
        });
       user.save().then(doc => {
        res.status(200).json(doc);
       }).catch(err => {
         res.status(500).json(err);
       });
     });

    router.route('/api/login')
        .post(validate,(req,res) => {
          let { email, password } = req.body;
          User.findByCredentials({email, password}).then(user => {
            user.generateAuthToken().then( token => {
              res.header('token',token).status(200).json(user);
            }).catch(err => {
              res.status(500).json("Oops something went wrong");
            });
           }).catch(err => {
              res.status(400).json({
                  error : {
                      email : {
                          message : "Invalid Credentials"
                      }
                  }
              });
          });
      });

    router.route('/api/users')
        .get(authenticate,(req, res) => {
            User.find({},(err,docs)=>{
               if (err) return res.status(500).json();
               res.status(200).json(docs);
            });
        });

//user route
    router.route('/api/user')
        .get(authenticate,(req,res) => {
            res.status(200).json(req.user);
        });

    router.route('/api/ques/img/save')
        .post((req,res) => {
         console.log(req.body);
         cloudinary.uploader.upload(req.body.file,{
           folder : 'EMS/questions'
         },function(error,result){
          if(error) return res.status(500).json(error);
          let { secure_url } = result;
          res.status(200).json({
             url : secure_url
            });
          });
         });

    app.use(router);

});



//app.listen(3000,() => console.log("App is listening on port 3000"));

exports.handler =  serverless(app);
