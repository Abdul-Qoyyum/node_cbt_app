const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, 'Level is required'],
        unique : [true, 'Level already exist']
    }
});

module.exports = mongoose.model("Level",LevelSchema);