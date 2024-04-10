

const express=require('express')
const sql=require('../config/dbConnect')
const routercourse=express.Router()
const asyncHandler = require("express-async-handler");
const generateToken=require('../utils/generateToken')

const authMiddleware = require("../utils/adminverfiy");


routercourse.post('/',authMiddleware,asyncHandler(async(req,res)=>
{
        const {title,category, level, popularity, Instructorname}=req.body


        const find=await sql`select * from courses where title=${title} and Instructorname=${Instructorname} `

    if(find[0])
    {
        return res.status(400).json({data:"course alreday exists"})
     
    }
               const cre=await sql`insert into courses (title,category, level, popularity, Instructorname) values (${title},${category},${level},${popularity},${Instructorname}) RETURNING course_id,title,category, level, popularity, Instructorname`
          
               if(req.user[0].role=='admin')
               {
                   if(cre)

                   {
                    return res.status(200).json({data:cre[0]})
                   }
                   else
                   {
                    return res.status(200).json({error:"error apperaed"})
                   }
               }
               else{
                return res.status(200).json({error:"not admin"})
               }


}))
routercourse.get('/read',authMiddleware,asyncHandler(async(req,res)=>{

           
    const readall=await sql`select * from courses`


    res.status(200).json(readall)

}))

routercourse.delete('/delete/:course_id',authMiddleware,asyncHandler(async(req,res)=>
{
    const courseId = req.params.course_id;

    if(req.user[0].role==='admin')
    {
                    const del=await sql`DELETE FROM courses WHERE course_id = ${courseId}`

                    return res.status(200).json({data:del})
    }
    else{
        return res.status(200).json({error:"not admin"})
       }
}))

module.exports=routercourse