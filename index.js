const express = require("express");
const app = express();
const env = require("dotenv").config();
const serverless = require("serverless-http");
const {courses}=require('./models/Course')
const {coursesenroll}=require('./models/Coursereg')
const {createtable,createprofile,createadminusers}=require('./models/User')
const router=require('./routes/User')
const routeradmin=require("./routes/admin/Admin")
const routercourse=require('./routes/Course')
const routerroll=require('./routes/Courseenrol')
const routerintro=require('./routes/Intro')
createtable()
createprofile()
createadminusers()
courses()
coursesenroll()
 
app.use(express.json());
app.use('/',routerintro)
app.use('/',router)
app.use('/admin',routeradmin)
app.use('/createcourse',routercourse)
app.use('/enroll',routerroll)

const port=process.env.port||3000
app.listen(port, () => {
	console.log("started ",port);
});
