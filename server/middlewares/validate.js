const validate = (req, res, next) => {
    let { email, password } = req.body;
    if(!email || !password){
     return res.status(400).json({
       error : {
        message : "Please provide your credentials"
       }
     });
    }
    next();
}

module.exports = validate;
