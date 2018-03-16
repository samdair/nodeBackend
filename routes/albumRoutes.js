
module.exports = function(app) {
  var album = require('../controllers/albumController');

  app.route('/album')
    .get(album.getAlbums)
    .post(album.addAlbum)

};
