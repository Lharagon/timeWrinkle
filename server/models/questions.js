var mongoose = require('mongoose');
var Schema = mongoose.Schema


var QuestionSchema = new mongoose.Schema({
  question: {type: String, required: true, minlength: 15},
  answer: {type: String, required: true},
  fAnswer1: {type: String, required: true},
  fAnswer2: {type: String, required: true},
 });
mongoose.model('Question', QuestionSchema);


