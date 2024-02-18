const jwt = require("jsonwebtoken");
const {User}= require('../models/user.model');
const verifyJWT = async (req, res, next) => {
  const token = req.cookies?.token;
  console.log("this is JWT", token);
  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "unautherized-no token provided ",
      success: false,
    });
  }
  const decode = jwt.verify(token,process.env.JWT_SECRET);
  console.log("this is decode",decode);

  const { _id }=decode;
  const user = await User.findById(
    {
     _id
    });

  if(!user){
    return res.status(401).json({
        message:"user not found",
    })
  }
  req.user = user;
  next();
};


module.exports = {
  verifyJWT,
};
