const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
//const { CloudinaryStorage } = require('multer-storage-cloudinary');
//const multer = require('multer');

require("dotenv").config();

const db = require('../db');
const { User } = require('../models');
const { authenticate,
        validate
       } = require('../middlewares');

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({
   extended : false,
   type : 'multipart/form-data'
}));

router.use(bodyParser.json());

//Cloudinary Configurations
/*
cloudinary.config({
  cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
  api_key :  process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET
});


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'EMS/questions',
    allowedFormats: ['png','jpg'],
    resource_type : 'image'
  }
});


const parser = multer({storage});
*/

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


    router.route('/api/user')
        .get(authenticate,(req,res) => {
            res.status(200).json(req.user);
        });


/*
    router.route('/api/ques/img/save')
     .post(parser.single("upload"),function(req,res){
        console.log(`file : ${JSON.stringify(req.file)}`);;
        res.status(200).json({
            url : req.file.path
          });
        });
*/

//route for signing cloudinary
//image upload credentials
    router.route('/api/cloud/sign')
      .get((req,res) => {
    try{
      // Get the timestamp in seconds
       let timestamp = Math.round((new Date).getTime()/1000);
      //Get the upload_preset
       let upload_preset = process.env.CLOUDINARY_UPLOAD_PRESET; 
      // Get the signature
       const signature = cloudinary.utils.api_sign_request({
         timestamp,
         upload_preset
        },process.env.CLOUDINARY_API_SECRET);
        res.status(200).json({
          timestamp,
          upload_preset,
          signature
         });
       }catch(e){
         res.status(500).json(e);
       }

      });

    app.use(router);

});



//app.listen(9000,() => console.log("App is listening on port 9000"));

exports.handler =  serverless(app,{
   binary : ["application/json","multipart/form-data","image/*"]
});
