const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cbt',{
  useNewUrlParser : true,
  useUnifiedTopology: true });
module.exports = mongoose.connection;

