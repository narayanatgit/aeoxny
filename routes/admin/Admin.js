const express=require('express')
const sql=require('../../config/dbConnect')
const validatePassword=require('../../utils/passwordvalid')
const routeradmin=express.Router()
const asyncHandler = require("express-async-handler");
const validatorr=require('deep-email-validator')
const bcrypt = require('bcrypt');
const emailvalid=require('../../utils/emailvalidation')
const generateToken=require('../../utils/generateToken')
const authMiddleware = require("../../utils/Verfiy");

routeradmin.post('/register',emailvalid,validatePassword,asyncHandler(async(req,res)=>

{ 
    
    const saltRounds = 10;

var hashpass
    
    if(!req.body.name)
		{
			return res.status(400).json({ error: 'username is required' });
		}
        if(!req.body.seckey)
		{
			return res.status(400).json({ error: 'secret key required' });
		}
		if(!req.body.email)
		{
			return res.status(400).json({ error: 'email is required' });
		}
		if(!req.body.password)
		{
			return res.status(400).json({ error: 'passwaord is required' });
		}
    const { seckey,name, email, password } = req.body;

    

    bcrypt.hash(password, saltRounds, function(err, hash) {
        hashpass=hash
   });

    const find=await sql`select * from adminusers where email=${email} `

    if(find[0])
    {
        return res.status(400).json({data:"user already exists"})
     
    }
    if(seckey=='admin')
    {
    result=await sql`insert into adminusers (name,email,password) values (${name},${email},${hashpass}) RETURNING id,name,email,password`}
    else
    {
        return res.status(400).json({error:"enter correct seckey"})
    }
    if(result)
    {
      return res.status(200).json({token:generateToken(email),data:result[0]})
    }

}))


routeradmin.post('/login',asyncHandler(async(req,res)=>{


    const { email, password } = req.body;
    const find=await sql`select * from adminusers where email=${email}  `

 if(find)
 {
   bcrypt.compare(password, find[0].password).then(function(result)
   {
    console.log(result)
    if(result)
    {
     return res.status(200).json({Token: generateToken(find[0].email),
        id:find[0].id,
        name: find[0].name,
        email: find[0].email,
        password: find[0].password,})
    }
      
   })
  
}
else
{
    return res.status(401).json({error:"enter the details"});
			
}
}))

module.exports=routeradmin