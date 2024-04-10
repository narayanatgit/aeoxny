const passwordValidator = require('password-validator');


const schema = new passwordValidator();


schema
  .is().min(8)           
  .is().max(100)         
  .has().uppercase()     
  .has().lowercase()     
  .has().digits()        
  .has().not().spaces(); 


const validatePassword = (req, res, next) => {
  const { password } = req.body;

  if (!schema.validate(password)) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters long, contain uppercase and lowercase letters, digits, and no spaces.'
    });
  }

  next();
};

module.exports = validatePassword;