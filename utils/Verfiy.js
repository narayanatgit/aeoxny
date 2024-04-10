const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sql=require('../config/dbConnect')

const authMiddleware = asyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			token = req.headers.authorization.split(" ")[1];
            
			const decoded = jwt.verify(token, 'nodejs');
           
			const email = await sql`select * from users where email=${decoded.id}`
			req.user= email;
			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not authorised, invalid token");
		}
	}
});

module.exports = authMiddleware;
