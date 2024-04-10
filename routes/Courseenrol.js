const express=require('express')
const sql=require('../config/dbConnect')
const routerroll=express.Router()
const asyncHandler = require("express-async-handler");


const authMiddleware=require('../utils/Verfiy')


routerroll.get('/see',authMiddleware,asyncHandler(async(req,res)=>
{
              
    const readall=await sql`select * from courses`


    res.status(200).json({user:req.user[0],data:readall})

}))
routerroll.post('/register',authMiddleware,asyncHandler(async(req,res)=>
{

    try {
              
          const {course_id}=req.body 

          const enroll =await sql`insert into user_enrollments (user_id,course_id) values (${req.user[0].id},${course_id})  RETURNING  user_id,course_id,enrollment_date`

        
            if(enroll)
            {
              return res.status(200).json({user:req.user[0],course:enroll[0]})
            }
         } catch (error) {
             return res.status(400).json(error)
         }
         



  

}))

routerroll.get('/enrolledcourses',authMiddleware,asyncHandler(async(req,res)=>
{

    const courses=await sql`SELECT c.course_id, c.title, c.category, c.level, c.popularity, e.enrollment_date 
    FROM courses c  
    JOIN user_enrollments e ON c.course_id = e.course_id 
    WHERE e.user_id = ${req.user[0].id}`

    return res.status(200).json({user:req.user[0],data:courses})
}))

routerroll.post('/filter',authMiddleware,asyncHandler(async(req,res)=>
{

    const { category, level}=req.body


        if(category!=undefined)
        {
      const courses=await sql`select * from courses where category=${category} `
      return res.status(200).json({user:req.user[0],data:courses})}
      if(level!=undefined)
      {
        const courses=await sql`select * from courses where level=${level}`
        return res.status(200).json({user:req.user[0],data:courses})
      }
        if(category!=undefined&&level!=undefined)
        {
            const courses=await sql`select * from courses where category=${category} or level=${level}`
            return res.status(200).json({user:req.user[0],data:courses})
        }
      
}))
module.exports=routerroll