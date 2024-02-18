const router = require('express').Router();
const {createGallary, getGallery, deleteGallery, deleteAll} = require('../../controllers/gallary.controller');

const upload = require('../../middlewares/multer.middleware');

router.route("/").post(upload.array('image',10),createGallary).get(getGallery);
router.route("/").delete(deleteGallery);
router.route("/all").delete(deleteAll);

module.exports = router;