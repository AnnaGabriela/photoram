const mongoose = require('mongoose');
const User = require('../models/user');

module.exports = () => {
  const controller = {};

  controller.addUser = async (req, res) => {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email
      };
      res.send(await User.create(user));
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  };

  controller.getUser = async (req, res) => {
    try {
      if (req.params.userId.length !== 24) throw { code: 422, message: "Invalid input" };
      const userId = new mongoose.Types.ObjectId(req.params.userId);
      const user = await User.findById(userId);
      if (user === {} || user === null || user === undefined) throw { code: 404, message: "User not found" };
      res.send(await User.findById(userId));
    } catch (err) {
      res.status(err.code).send({ error: err.message });
    }
  };

  return controller;
};
