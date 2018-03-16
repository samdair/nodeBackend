var mongoose = require('mongoose');
var Album = mongoose.model('AlbumModel');

exports.getAlbums = function(req, res) {
  Album.find({}, function(err,album){
    if (err)
      res.send(err);
      res.json(album);
    }); 
};



exports.addAlbum = function(req, res) {
  var new_album = new Album(req.body);
  new_album.save(function(err, album) {
    if (err)
      res.send(err);
    res.json(album);
  });
};




//Video.paginate({}, { page: 2, limit: 5 }, function(err, result) {
  //result.docs
  // result.total
  // result.limit - 10
  // result.page - 3
  // result.pages 
  //});


