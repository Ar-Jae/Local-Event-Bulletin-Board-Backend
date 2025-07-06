const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

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
        const foundAdmin = await Admin.findById(payload.id);

        if (!foundUser && !foundAdmin) {
            throw new Error("Unauthorized");
        }

        console.log("User:", foundUser ? "FOUND" : "NOT FOUND");
        console.log("Admin:", foundAdmin ? "FOUND" : "NOT FOUND");
        
        req.User = {
            id: foundUser ? foundUser.id : null, 
            email: foundUser ? foundUser.email : null,
            isAdmin: foundUser ? foundUser.isAdmin : false,  
        }
        //req.User = {
        //    id: foundUser.id, 
        //    email: foundUser.email,
        //    isAdmin: foundUser.isAdmin,  
        //};

        console.log("User in Request:", req.User);

        req.Admin = {
            id: foundAdmin ? foundAdmin.id : null, 
            email: foundAdmin ? foundAdmin.email : null,
            isAdmin: foundAdmin ? true : false,  
        };
        console.log("Admin in Request:", req.Admin);

        next();

    } catch (err) {
        console.error("Auth error:", err);
        res.status(401).json({ error: "Unauthorized" });
    }
    console.log("--------------------sessionValidation Completed--------------------");
};
  
module.exports = sessionValidation;


