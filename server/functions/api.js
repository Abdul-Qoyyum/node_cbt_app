const express = require('express');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const db = require('../db');
const { User } = require('../models');

const app = express();
const router = express.Router();
router.use(bodyParser.urlencoded({extended : false}));
router.use(bodyParser.json());

db.on('error',console.error.bind(console, 'Connection Error'));
db.once('open',() => {
 router.route('/api')
     .post(function(req,res){
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
     })
     .get(function(req,res){
       User.find({}).then(user => {
        res.status(200).json(user);
       }).catch(err => {
        res.status(500).json(err);
       });
      });

    app.use(router);

});


exports.handler =  serverless(app);
