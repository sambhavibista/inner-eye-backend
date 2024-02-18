const router = require('express').Router();
const {createBlog, getBlog, updateBlog, updateBlogImage, deleteBlog, delteBlogImage} = require('../../controllers/blog.controller');

const upload = require('../../middlewares/multer.middleware');

const uploadBlog = upload.fields([
    {name: 'image',maxCount: 1},
    {name: 'authorImage', maxCount: 1}
])

router.route("/").post(uploadBlog,createBlog).get(getBlog);

router.route("/:blogId").patch(updateBlog).delete(deleteBlog);
router.route("/:blogId/authorImage").patch(uploadBlog,updateBlogImage).delete(uploadBlog,delteBlogImage);


module.exports = router;