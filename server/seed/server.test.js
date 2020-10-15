const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { ObjectId } = mongoose.Types;
const { User } = require('../models');

let userOneId = new ObjectId();
let userTwoId = new ObjectId();

console.log(userOneId);

const users = [
 {
  _id : userOneId,
  email : 'admin@admin.com',
  password : 'secret',
 },
 {
  _id : userTwoId,
  email : 'user@user.com',
  password : 'secret'
 }
];

User.create(users,function(err, docs){
 console.log(docs);
});

