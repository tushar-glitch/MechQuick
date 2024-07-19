const jwt = require("jsonwebtoken");
require('dotenv').config()

module.exports = (req, res, next) => {
  
  try {
    const token = req.headers.authorization.split(" ")[1];
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res.status(401).send("Token error");
    }
    req.user = verifyToken.id;
    next();
  } catch (error) {
    console.log(error);
    return error;
  }
};
