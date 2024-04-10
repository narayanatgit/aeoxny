const express=require('express')

const routerintro=express.Router()
const asyncHandler = require("express-async-handler");

routerintro.get('/',asyncHandler(async(req,res)=>
{


            res.status(200).send(

                `<b>POST/register -</b> name,email,password (Password must be at least 8 characters long, contain uppercase and lowercase letters, digits, and no spaces)
                <br></br>
                <b> POST/login -</b> email,password
                 <br></br>
                 <b>POST/profile -</b> image,phonenumber
                 <br></br>
                 <b>GET/view -</b> returns the name,email,phno,photo
                 <br></br>
                 <b>PUT/updateprofile/:id -</b> get the user id by params update the profile bu changing name,email,phno,image
                 <br></br>
                 <b>POST/admin/register -</b> name,email,password (Password must be at least 8 characters long, contain uppercase and lowercase letters, digits, and no spaces) ,seceret key(to verfiy as admin)
                 <br></br>
                 <b>POST/admin/login -</b> email,password
                 <br></br>
                 <b>POST/createcourse/ -</b> after logining as admin enter  title,category, level, popularity, Instructorname
                 <br></br>
                 <b>GET/createcourse/read -</b> after new courses created by admin he/she can see the courses available returns ID,title,category, level, popularity, Instructorname
                 <br></br>
                 <b>DELETE/createcourse/delete/:course_id -</b> Delete the courses it can done only by admin by getting the course ID
                 <br></br>
                 <b>GET/enroll/see - </b>Users can the available courses that are created by admin
                 <br></br>
                 <b>POST/enroll/register - </b> User need click the course by fetching the course from id store in enrollment table
                 <br></br>
                 <b>GET/enroll/enrolledcourses - </b> Users can see the enrolled courses they register for the same courses again
                 <br></br>
                 <br></br>
                `
            )
}))

module.exports=routerintro