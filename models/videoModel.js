var mongoose = require('mongoose');
var mangoosePaginate = require('mongoose-paginate');
var Schema = mongoose.Schema;


var VideoSchema = new Schema({
  videoId: String,
  album: String,
  title: String,
  imageUrl: String,
}, { timestamps: true });

VideoSchema.plugin(mangoosePaginate);
module.exports = mongoose.model('VideoModel', VideoSchema);