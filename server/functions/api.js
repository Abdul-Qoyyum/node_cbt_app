const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const db = require('../db');
const { User } = require('../models');
const { authenticate,
        validate
       } = require('../middlewares');

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

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
          let { email, password, remember_me } = req.body;
          User.findByCredentials({email, password}).then(user => {
            user.generateAuthToken(remember_me).then( token => {
              res.header('token',token).status(200).json(user);
            }).catch(err => {
              res.status(500).json(err);
            });
           }).catch(err => {
              res.status(400).json(err);
          });
      });

    router.route('/api/users')
        .get(authenticate,(req, res) => {
            User.find({},(err,docs)=>{
               if (err) return res.status(500).json();
               res.status(200).json(docs);
            });
        });

    router.route('/api/user/:token')
        .get((req,res) => {
            console.log(`token : ${req.params.token}`);
            res.status(200).send("Successfull");
        });

    app.use(router);

});



//app.listen(3000,() => console.log("App is listening on port 3000"));

exports.handler =  serverless(app);
