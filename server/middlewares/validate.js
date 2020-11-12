const _ = require('lodash');

//handles validation recursively
 const check = ( payload ) => {
   let error = {
       message : "Bad Request"
     };

   //validate nested objects payload
    if(typeof payload === 'object'){
       for(let value in payload){
       //stops further execution if no value
       //is provided
           if(typeof payload[value] === 'undefined'){
//            return res.status(400).json({ error });
console.log(`BROKEN 2`);
              throw new Error('BROKEN 2');
           }

           if(typeof payload[value] === 'object'){
       //call check recursively
              check(payload[value]);
           }
       }

    }else{
//      return res.status(400).json({ error });
console.log(`BROKEN 1`);
              throw new Error('BROKEN 1');
    }

 }


const validate = (req, res, next) => {
/*
    let { email, password } = req.body;
    if(!email || !password){
     return res.status(400).json({
       error : {
        message : "Please provide your credentials"
       }
     });
    }
    next();

*/
    //validate all inputs objects and
    //nested objects
    check(req.body);
    next();
}



module.exports = validate;
