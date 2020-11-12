const _ = require('lodash');
const { Level } = require('../models');
const db = require('../db');


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
//we're connected lets seed data...
    const levels = [
        { name : "JSS 1" },
        { name : "JSS 2" },
        { name : "JSS 3" },
        { name : "SS 1"},
        { name : "SS 2"},
        { name : "SS 3" }
    ];

     Level.find({},(err,docs)=>{
      if(err)return console.log("Unable to seed level");
      if(!_.isEmpty(docs)){
        console.log("Level : Already seeded");
        //exit console
        process.exit();
       }else{
       console.log("Seeding all levels");
       Level.insertMany(levels,(err, docs) => {
        if (err) console.log(`Error : ${err}`);
        console.log("Seeding successful");
        console.log(`Docs : ${docs}`);
        //exit console
        process.exit();
      });
     }
     });

});


