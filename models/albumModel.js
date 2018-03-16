var mongoose = require('mongoose');
var mangoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;


var AlbumSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String,
}, { timestamps: true });

AlbumSchema.plugin(mangoosePaginate);
module.exports = mongoose.model('AlbumModel', AlbumSchema);