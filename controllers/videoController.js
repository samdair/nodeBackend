var mongoose = require('mongoose');
var Video = mongoose.model('VideoModel');

exports.getVideos = function(req, res) {
  Video.find({}, function(err,Video){
    if (err)
      res.send(err);
      res.json(Video);
    }); 
};
exports.getVideosByAlbum = function(req, res) {
  Video.find({album: req.params.name}, function(err,Video){
    if (err)
      res.send(err);
      res.json(Video);
    }); 
};


exports.addVideo = function(req, res) {
  var new_video = new Video(req.body);
  new_video.save(function(err, Video) {
    if (err)
      res.send(err);
    res.json(Video);
  });
};


exports.getVideo = function(req, res) {
  console.log('debug req', req.params.videoId)
  Video.findOne({videoId: req.params.videoId}, function(err, Video) {
    if (err)
      res.send(err);
    res.json(Video);
  });
};


exports.updateVideo = function(req, res) {
  Video.findOneAndUpdate({videoId: req.params.videoId}, req.body, {new: true}, function(err, Video) {
    if (err)
      res.send(err);
    res.json(Video);
  });
};


exports.deleteVideo = function(req, res) {
  Video.remove({
    videoId: req.params.videoId
  }, function(err, Video) {
    if (err)
      res.send(err);
    res.json({ message: 'Video successfully deleted' });
  });
};

//Video.paginate({}, { page: 2, limit: 5 }, function(err, result) {
  //result.docs
  // result.total
  // result.limit - 10
  // result.page - 3
  // result.pages 
  //});


