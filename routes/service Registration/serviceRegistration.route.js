const express = require('express');
const router = express.Router();

const{createServiceRegistration, getServiceRegistration}= require('../../controllers/serviceRegistration.controller');
router.route("/").post(createServiceRegistration).get(getServiceRegistration);

module.exports=router;