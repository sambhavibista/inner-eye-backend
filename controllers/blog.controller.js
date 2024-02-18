
const { Blog } = require("../models/blog.model");
const { errorHandler } = require("../utils/errorHandler");

const fs = require("fs");
const createBlog = async (req, res) => {
  const { title, content, author } = req.body;
  let image = req.files.image[0].path;
  let authorImage = req.files.authorImage[0].path;

  try {
    const blog = await Blog.create({
      title,
      content,
      image,
      author,
      authorImage,
    });
    return res.status(201).json({
      message: "blog created succesfully",
      data: blog,
      success: true,
      statusCode: 201,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getBlog = async (req, res) => {
  try {
    const blog = await Blog.find();
    return res.status(200).json({
      message: "blog fetched succesfully",
      data: blog,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};
const updateBlog = async (req, res) => {
  const { blogId } = req.params;
  const { title, content, author } = req.body;

  try {
    const newBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        content,
        author,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "blog updated succesfully",
      data: newBlog,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

const updateBlogImage = async (req, res) => {
  const { blogId } = req.params;
  let image = req?.files?.image?.[0]?.path;
  let authorImage = req?.files?.authorImage?.[0]?.path;

  try {
    //extract old image and author image link
    const oldBlog = await Blog.findById(blogId);
    const oldImage = oldBlog?.image;
    const oldAuthorImage = oldBlog?.authorImage;

    //after extracting
    const newBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        image,
        authorImage,
      },
      { new: true }
    );

    if (image && oldImage) {
      fs.unlinkSync(oldImage);
      //delete the old image
      console.log("old image deleted", oldImage);
    }

    if (authorImage && oldAuthorImage) {
      fs.unlinkSync(oldAuthorImage);
      console.log("old author image deleted", oldAuthorImage);
    }

    return res.status(200).json({
      message: "image updated succesfully",
      data: newBlog,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

const deleteBlog = async (req, res) => {
  const { blogId } = req.params;


  try {
    const newBlog = await Blog.findByIdAndDelete(blogId);
    return res.status(200).json({
      message: "blog deleted successfully",
      data: newBlog,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};


const delteBlogImage = async (req, res) => {
    const { blogId } = req.params;
    let image = req?.files?.image?.[0]?.path;
    let authorImage = req?.files?.authorImage?.[0]?.path;
  
    try {
        const oldBlog = await Blog.findById(blogId);
        if(!oldBlog){
            return res.status(404).json({
                message:"blog image not found",
                success:false,
                statusCode:404,
            })
        }
      //extract old image and author image link
      
      const oldImage = oldBlog?.image;
      const oldAuthorImage = oldBlog?.authorImage;
  
      //after extracting
      const newBlog = await Blog.findByIdAndDelete(blogId);
  
      if (image && oldImage) {
        fs.unlinkSync(oldImage);
        //delete the old image
        console.log("old image deleted", oldImage);
      }
  
      if (authorImage && oldAuthorImage) {
        fs.unlinkSync(oldAuthorImage);
        console.log("old author image deleted", oldAuthorImage);
      }
  
      return res.status(200).json({
        message: "image deleted succesfully",
        data: newBlog,
        success: true,
        statusCode: 200,
      });
    } catch (error) {
      return errorHandler(error, res);
    }
  };
  


module.exports = {
  createBlog,
  getBlog,
  updateBlog,
  updateBlogImage,
  deleteBlog,
  delteBlogImage,
};
