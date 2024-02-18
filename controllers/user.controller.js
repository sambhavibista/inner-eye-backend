const { User } = require("../models/user.model");
const { errorHandler } = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;

const registerUser = async (req, res) => {
  const { name, email, phoneNumber, password } = req.body;

  //encrypt password
  const hashPassword = await bcrypt.hash(password, saltRounds); //hashpassword using encrypt

  try {
    const user = await User.create({
      name,
      email,
      phoneNumber,
      password: hashPassword,
    });

    return res.status(201).json({
      statusCode: 201,
      message: "user registered succesfully",
      data: user,
      success: true,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        statusCode: 404,
        message: "user not found",
      });
    }
    console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch === false) {
      return res.status(404).json({
        statusCode: 404,
        message: "incorrect password",
      });
    }
    //jwt token generate and set in cookies
    const token = jwt.sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    console.log("this is jwt token", token);
    res.cookie("token", token);

    return res.status(200).json({
      statusCode: 200,
      message: "you are successfully logged in",
      success: true,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
