const EmailValidator = require('email-deep-validator');

const asyncHandler = require("express-async-handler");

const emailvalid=asyncHandler(async(req,res,next)=>
{

    const {email}=req.body
    const emailValidator = new EmailValidator();
const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(email);

if(!wellFormed||!validDomain)
{
    return res.status(400).json({
        error: 'enter the valid email'
      });
}
next();
})

module.exports=emailvalid