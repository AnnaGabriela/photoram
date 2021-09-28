const controller = require('../controllers/image')();

module.exports = (app) => {
  app.route('/api/image/:imageId').get(controller.getImage);
  app.route('/api/image').post(controller.addImage);
  app.route('/api/image/:imageId').delete(controller.deleteImage);
  app.route('/api/images/:publisherId').get(controller.getImages);
  app.route('/api/images').post(controller.addImages);
  app.route('/api/images').delete(controller.deleteImages);
};