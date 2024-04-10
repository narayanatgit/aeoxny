const express=require('express')
const sql=require('../config/dbConnect')
const router=express.Router()
const validatePassword=require('../utils/passwordvalid')
const asyncHandler = require("express-async-handler");

const bcrypt = require('bcrypt');
const generateToken=require('../utils/generateToken')
const authMiddleware = require("../utils/Verfiy");
const {Resend}=require('resend')
const emailvalid=require('../utils/emailvalidation')
const resend = new Resend('re_JwXVjtSE_LFnGYPBcdYYvcWMEeTt9cArg');

router.post('/register',emailvalid,validatePassword,asyncHandler(async(req,res)=>

{    
    const saltRounds = 10;

var hashpass
    
    if(!req.body.name)
		{
			return res.status(400).json({ error: 'username is required' });
		}
		if(!req.body.email)
		{
			return res.status(400).json({ error: 'email is required' });
		}
		if(!req.body.password)
		{
			return res.status(400).json({ error: 'passwaord is required' });
		}
    const { name, email, password } = req.body;

    
    bcrypt.hash(password, saltRounds, function(err, hash) {
        hashpass=hash
   });

    const find=await sql`select * from users where email=${email} `

    if(find[0])
    {
        return res.status(400).json({data:"user already exists"})
     
    }
    result=await sql`insert into users (name,email,password) values (${name},${email},${hashpass}) RETURNING id,name,email,password`
    if(result)
    {
       await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'registering to aeoxny',
        html: '<h1>Congrats on registering to aeoxny </h1>'
      });
      return res.status(200).json({token:generateToken(email),data:result[0]})
    }
   
}))


router.post('/login',asyncHandler(async(req,res)=>
{
   
    const { email, password } = req.body;
    const find=await sql`select * from users where email=${email}  `

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


router.post('/profile',authMiddleware,asyncHandler(async(req,res)=>
{
  
    const {imageurl,phno}=req.body
      id=req.user[0].id
     
      const profile=await sql`insert into profile (id,profileimageurl,phoneno) values(${id},${imageurl},${phno}) RETURNING ${id},profileimageurl,phoneno `

      if(profile)
    {
      return res.status(200).json({data:profile[0]})
    }
}))

router.get('/view',authMiddleware,asyncHandler(async(req,res)=>
{
                const data=await sql`select users.id,users.name,users.email,profile.profileimageurl,profile.phoneno from users,profile where users.id=profile.id`
              
                    
               res.status(200).json({dat:data[0]})
                
}))

router.put('/updateprofile/:id',authMiddleware,asyncHandler(async(req,res)=>
{
                  const id=req.params.id
            const {name,email,imageurl,phno}=req.body 

            const er=await sql`update profile set profileimageurl=${imageurl},phoneno=${phno} where id=${id}`
            const et=await sql`update users set name=${name},email=${email} where id=${id}`

             const data=await sql`select users.id,users.name,users.email,profile.profileimageurl,profile.phoneno from users,profile where users.id=profile.id`

             res.status(200).json({dat:data[0]})


                    
}))
module.exports = router;