const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET;
console.log("JWT_SECRET:", JWT_SECRET ? "SET" : "NOT SET");


const sessionValidation = async (req, res, next) => {
    console.log("--------------------sessionValidation Started--------------------");

    try {
        if (req.method === "OPTIONS") next();
        
        const authHeader = req.headers.authorization;
        console.log("AuthHeader:", authHeader ? "SET" : "NOT SET");
        
        if (!authHeader) throw new Error("Forbidden");

        const authToken = authHeader.includes("Bearer")
            ? authHeader.split(" ")[1]
            : authHeader;

        console.log("authToken:", authToken ? "SET" : "NOT SET");
            
            
        const payload = jwt.verify(authToken, JWT_SECRET);
        const foundUser = await User.findById(payload.id);

        console.log("User:", foundUser ? "FOUND" : "NOT FOUND");
        
        req.User = {
            id: foundUser.id, 
            email: foundUser.email,  
        };

        console.log("User in Request:", req.User);

        next();

    } catch (err) {
        console.error("Auth error:", err);
        res.status(401).json({ error: "Unauthorized" });
    }
    console.log("--------------------sessionValidation Completed--------------------");
};
  
module.exports = sessionValidation;


