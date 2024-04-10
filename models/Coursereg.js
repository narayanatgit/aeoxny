const sql=require('../config/dbConnect')

async function coursesenroll()
{

    const result=await sql `CREATE TABLE IF NOT EXISTS user_enrollments (
       
        user_id INT ,
        course_id INT ,
        enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, course_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (course_id) REFERENCES courses(course_id)
    );`
}


module.exports={coursesenroll}