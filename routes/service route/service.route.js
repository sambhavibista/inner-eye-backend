const express = require('express');
const router = express.Router();
const {verifyJWT} = require('../../middlewares/auth.middleware');

const{createService, getServices, updateService, deleteService}= require('../../controllers/service.controller');
router.route("/").post(verifyJWT, createService).get(getServices);
router.route("/:id").patch(updateService);
router.route("/:id").delete(deleteService);

module.exports= router;
