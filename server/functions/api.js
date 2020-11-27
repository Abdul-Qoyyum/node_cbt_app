const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
const { body, validationResult } = require('express-validator');
const _ = require('lodash');
//const { CloudinaryStorage } = require('multer-storage-cloudinary');
//const multer = require('multer');


require("dotenv").config();

const db = require('../db');
const {
        User,
        Question,
        Level,
        Subject,
        Result
       } = require('../models');

const {
        authorize,
        validate
       } = require('../middlewares');

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({extended : false}));
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
        .post([
           body('email').isEmail().withMessage("Invalid Email"),
           body('email').not().isEmpty().withMessage("Email is required"),
           body('password').not().isEmpty().withMessage("Password is required")
          ],(req,res) => {
 // Finds the validation errors in this request and wraps them in an object with handy functions
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }

          let { email, password, remember_me } = req.body;
          User.findByCredentials({email, password}).then(user => {
            user.generateAuthToken(remember_me).then( token => {
              res.header('emstoken',token).status(200).json(user);
            }).catch(err => {
              res.status(500).json({
                 msg : "Oops something went wrong"
              });
            });
           }).catch(err => {
              res.status(400).json({
                 error : {
                    msg : "Invalid Credentials"
                 }
              });
          });
      });


    router.route('/api/users')
        .get(authorize,(req, res) => {
            User.find({},(err,docs)=>{
               if (err) return res.status(500).json();
               res.status(200).json(docs);
            });
        });

//verify token on app start
    router.route('/api/token/verify')
        .get(authorize,(req,res) => {
            res.status(200).header('emstoken', req.token).json(req.user);
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


//Signature for cloudinary image upload
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



    router.route('/api/ques')
        .post(authorize,[
          body('body').not().isEmpty().withMessage("body is required"),
          body('options.A').not().isEmpty().withMessage('Option A is required'),
          body('options.B').not().isEmpty().withMessage('Option B is required'),
          body('options.C').not().isEmpty().withMessage('Option C is required'),
          body('options.D').not().isEmpty().withMessage('Option D is required'),
          body('answer').not().isEmpty().withMessage('Answer is required')
          ],(req,res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }

           const question = new Question({
              ...req.body, _creator : req.user._id
            });

  // console.log(`Ques : ${JSON.stringify(question)}`);
  // res.status(200).json({message : "Saved"});

           question.save().then(data => {
             res.status(200).json(data);
           }).catch(err => {
             res.status(500).json(err);
           });
        });

//fetch all questions that belongs to a particular subject
     router.route('/api/ques/:id')
        .get(authorize,(req,res) => {
            Question.find({
                _subject : req.params.id
            },(err, docs) => {
              if (err) return res.status(500).json(err);
              if(_.isEmpty(docs)) return res.status(404).json([]);
              res.status(200).json(docs);
            });
        });

//Remember to use express-validator middleware
    router.route('/api/level')
      .get(authorize,(req,res)=>{
       //fetch all levels or routes
         Level.find({},(err,docs) => {
           if(err)return res.status(500).json(err);
            res.status(200).json(docs);
         });
       })
      .post(authorize,[
         body('name').not().isEmpty().withMessage("Invalid Class")
        ],(req,res) => {
// Finds the validation errors in this request and wraps them in an object with handy functions
         const errors = validationResult(req);
         if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }
//Save the level record
        const level = new Level(req.body);
         level.save().then(function (doc) {
             res.status(200).json(doc);
         }).catch(function (err) {
             res.status(500).json(err);
         });
       });

    //Subjects routes
   router.route('/api/subjects')
       .get(authorize,(req,res) => {
         //fetch all subjects
           Subject.find({}).populate('_level').populate('_creator').exec(function(err, docs){
               if (err) return res.status(500).json(err);
               if(_.isEmpty(docs)) return res.status(404).json([]); //Remember to handle all 404 cases in order routes
               res.status(200).json(docs);
           });
       });

   router.route('/api/subject')
        .get(authorize,(req,res) => {
            //fetch subject for the currently logged in user based on their id
            Subject.find({ _creator : req.user._id}).populate('_level').populate('_creator').exec(function(err, docs){
                if (err) return res.status(500).json(err);
                res.status(200).json(docs);
            });
        })
        .post(authorize,[
            body('_level').not().isEmpty().withMessage('Level id is required'),
            body('title').not().isEmpty().withMessage('Title is required'),
            body('duration').not().isEmpty().withMessage('Duration is required')
        ],(req, res) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //save the subject resource if validation is successfull
            const subject = new Subject({ ...req.body, _creator : req.user._id });
            subject.save().then(function (doc) {
             doc.populate('_level').populate('_creator').execPopulate().then(doc => {
               res.status(200).json(doc);
             }).catch(err => {
               res.status(500).json({});
              });
            }).catch(function (err) {
                res.status(500).json(err);
            });
        });

    router.route('/api/exam/submit')
        .post(authorize,[
            body('_subject').not().isEmpty().withMessage("Subject id is required"),
            body('score').not().isEmpty().withMessage("Score is required")
        ],(req, res) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            //save the result if validation is successful
            //if the result has already been recorded update it
            //else create a new record for the result
            Result.find({
                _creator : req.user._id,
                _subject: req._subject
            },function (err, docs) {
                 if (err) return res.status(500).json(err);
                 //create a new record if none was found
                 if (_.isEmpty(docs)){
                     const result = new Result({
                         ...req.body, _creator : req.user._id
                     });

                     result.save().then(docs => {
                         res.status(200).json(docs);
                     }).catch(err => {
                         res.status(500).json(err);
                     })

                 }else{
                     //update the existing record
                     Result.findOneAndUpdate({
                         _creator : req.user._id,
                         _subject : req._subject
                     },{ ...req.body, _creator : req.user._id }, {
                         new : true
                     },(err, docs) => {
                         if(err) return res.status(500).json(err);
                         res.status(200).json(docs);
                     });

                 }
            });

        });


    app.use(router);

});



//app.listen(9000,() => console.log("Server is listening on port 9000"));


exports.handler =  serverless(app,{
   binary : ["application/json","multipart/form-data","image/*"]
});

