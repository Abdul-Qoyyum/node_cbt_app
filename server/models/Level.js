const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model("Level",LevelSchema);