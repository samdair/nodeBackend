
module.exports = function(app) {
  var video = require('../controllers/videoController');

  app.route('/video')
    .get(video.getVideos)
    .post(video.addVideo);

  app.route('/video/:videoId')
	.get(video.getVideo)
	.put(video.updateVideo)
	.delete(video.deleteVideo);

  app.route('/videosByAlbum/:name')
	.get(video.getVideosByAlbum);
};
