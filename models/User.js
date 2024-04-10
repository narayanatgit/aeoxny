const sql=require('../config/dbConnect')
async function createtable()
{

    const result=await sql`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255)
        
        
    );`
}
async function createprofile()
{
    const result=await sql `CREATE TABLE IF NOT EXISTS profile(id INT ,profileimageurl varchar(255),phoneno varchar(255),CONSTRAINT fk_Employee  
    FOREIGN KEY(id)   
    REFERENCES users(id)  )`
}
async function createadminusers()
{
    const result=await sql`CREATE TABLE IF NOT EXISTS adminusers (
        id SERIAL PRIMARY KEY,
      
        name VARCHAR(255),
        email VARCHAR(255),
        password VARCHAR(255),
        role VARCHAR(255) default 'admin'
        );`

}
module.exports={createtable,createprofile,createadminusers}