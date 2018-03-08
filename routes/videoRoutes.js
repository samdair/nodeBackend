
module.exports = function(app) {
  var video = require('../controllers/videoController');

  app.route('/video')
    .get(video.getVideos)
    .post(video.addVideo);
};
