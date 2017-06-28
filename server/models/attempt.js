var mongoose = require('mongoose');
var Schema = mongoose.Schema


var AttemptSchema = new mongoose.Schema({
  _user: {type: Schema.Types.ObjectId, ref: 'User'},
  score: {type: String, required: true},
  percentage: {type: Number, required: true}
 }, { timestamps: true });
mongoose.model('Attempt', AttemptSchema);


