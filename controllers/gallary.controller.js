const { Gallary } = require("../models/gallary.model");
const { errorHandler } = require("../utils/errorHandler");
const fs = require("fs");

const createGallary = async (req, res) => {
  // console.log(req.files);
  try {
    let image = req.files;

    let imageLink = image.map(function (image) {
      return {
        image: image.path,
      };
    });
    let response = await Gallary.insertMany(imageLink);
    return res.status(201).json({
      message: "gallery inserted succesfully",
      data: response,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getGallery = async (req, res) => {
  try {
    const gallery = await Gallary.find();
    return res.status(200).json({
      message: "gallery fetched succesfully",
      data: gallery,
      success: true,
      statusCode: 200,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

const deleteGallery = async (req, res) => {
  try {
    let image = req?.body?.imageId;
    // console.log(image);
    const gallery = await Gallary.find({
      _id: {
        $in: image,
      },
    });
    console.log(gallery);

    let del = await Gallary.deleteMany({
      _id: {
        $in: image,
      },
    });

    gallery.forEach(function (img) {
      try {
        fs.unlinkSync(img.image);
        console.log("Image deleted:", img.image);
      } catch (error) {
        if (error.code === "ENOENT") {
          console.log("File not found:", img.image);
        } else {
          console.error("Error deleting file:", img.image, error);
        }
      }
    });

    return res.status(404).json({
      message: " image not found",
      data: del,
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

const deleteAll = async (req, res) => {
  try {
    const gal = await Gallary.find();
    console.log(gal);
    if (gal.length == 0) {
      return res.status(404).json({
        message: "no image found",
      });
    }
    gal.forEach(function (gall) {
      console.log(gall.image);
      fs.unlinkSync(gall.image);
    });

    const gallery = await Gallary.deleteMany();
    return res.status(404).json({
      message: "All images deleted",
    });
  } catch (error) {
    return errorHandler(error, res);
  }
};

module.exports = {
  createGallary,
  getGallery,
  deleteGallery,
  deleteAll,
};
