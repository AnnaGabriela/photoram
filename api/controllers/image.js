const mongoose = require('mongoose');
const Image = require('../models/image');
const OBJ_ID_LEN = 24;

module.exports = () => {
  const controller = {};

  controller.addImage = async (req, res) => {
    try {
      const image = {
        url: req.body.url,
        tags: req.body.tags,
        isPrivate: req.body.isPrivate,
        publisherId: new mongoose.Types.ObjectId(req.body.publisherId),
        uploadDate: req.body.uploadDate,
      };
      if (image.url === null || image.url === undefined || image.publisherId === null || image.publisherId === undefined || req.body.publisherId.length !== OBJ_ID_LEN)
        throw { code: 422, message: "Invalid input" };
      res.send(await Image.create(image));
    } catch (err) {
      res.status(err.code).send({ error: err.message });
    }
  };

  controller.getImage = async (req, res) => {
    try {
      const { imageId } = req.params;
      if (imageId.length !== OBJ_ID_LEN) throw { code: 422, message: "Invalid input" };
      const image = await Image.findById(imageId);
      if (image === {} || image === null || image === undefined) throw { code: 404, message: "Image not found" };
      res.send(image);
    } catch (err) {
      res.status(err.code).send({ error: err.message });
    }
  };

  controller.deleteImage = async (req, res) => {
    try {
      const { imageId } = req.params;
      if (imageId.length !== OBJ_ID_LEN) throw { code: 422, message: "Invalid input" };
      const deletedImage = await Image.findByIdAndDelete(new mongoose.Types.ObjectId(imageId));
      if (deletedImage === {} || deletedImage === null || deletedImage === undefined) throw { code: 404, message: "Image not found" };
      res.send(deletedImage);
    } catch (err) {
      res.status(err.code).send({ error: err.message });
    }
  };

  controller.addImages = async (req, res) => {
    try {
      const images = typeof (req.body) === 'string' ? JSON.parse(req.body.images) : req.body.images;

      if (images === null || images === undefined || images.length === 0) throw { code: 422, message: "Invalid input" };

      images.map(image => ({
        url: image.url,
        tags: image.tags,
        isPrivate: image.isPrivate,
        publisherId: new mongoose.Types.ObjectId(image.publisherId),
        uploadDate: image.uploadDate,
      }));

      res.send(await Image.insertMany(images));
    } catch (err) {
      res.status(err.code).send({ error: err.message });
    }
  };

  controller.getImages = async (req, res) => {
    try {
      const perPage = parseInt(req.query.perPage) || 10;
      const page = parseInt(req.query.page) || 1;
      let publisherId = new mongoose.Types.ObjectId(req.params.publisherId);

      const images = await Image.aggregate([
        { $match: { $or: [{ publisherId: publisherId }, { isPrivate: false }] } },
        { $addFields: { isOwner: { $cond: { if: { $eq: ["$publisherId", publisherId] }, then: true, else: false } } } },
        { $unset: "publisherId" }
      ])
        .skip(perPage * page - perPage)
        .limit(perPage);

      res.send({
        images,
        nextPage: images.length > perPage ? page + 1 : -1,
      });
    } catch (err) {
      res.status(err.code).send({ error: err.message });
    }
  };

  controller.deleteImages = async (req, res) => {
    try {
      const imagesIds = typeof (req.body.images) === 'string' ? JSON.parse(req.body.images) : req.body.images;
      const validIds = imagesIds.filter(imageId => imageId.length === OBJ_ID_LEN).map(imageId => new mongoose.Types.ObjectId(imageId));

      if (validIds.length === 0) throw { code: 422, message: "Invalid input" };

      const deletedObj = await Image.deleteMany({ _id: { $in: validIds } });

      if (deletedObj.deletedCount === 0) throw { code: 404, message: "Images not found" };

      res.send(deletedObj);
    } catch (err) {
      res.status(err.code).send({ error: err.message });
    }
  };

  return controller;
};
