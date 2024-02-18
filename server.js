const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//parse json format
app.use(express.json());

const connectMongodb = require("./dbconfig/mongodb.config");
connectMongodb();

//routes
const serviceRoutes = require('./routes/service route/service.route');
app.use("/service",serviceRoutes);

const blogRoutes = require('./routes/blog route/blog.route');
app.use("/blog",blogRoutes);

const gallaryRoute = require('./routes/gallary route/gallary.route');
app.use("/gallary",gallaryRoute);

const userRoutes =require('./routes/user route/user.route');
app.use("/user",userRoutes);

const serviceRegistrationRoutes = require('./routes/service Registration/serviceRegistration.route');
app.use("/serviceRegister",serviceRegistrationRoutes);


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });