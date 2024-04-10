const sql=require('../config/dbConnect')

async function courses()
{

    const result=await sql `CREATE TABLE IF NOT EXISTS  courses (
        course_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        level VARCHAR(50),
        popularity INT,
          Instructorname VARCHAR(255)
    );`
}


module.exports={courses}