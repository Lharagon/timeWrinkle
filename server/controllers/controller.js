var mongoose = require('mongoose');
var User = mongoose.model('User');
var Question = mongoose.model('Question');
var Attempt = mongoose.model('Attempt');


module.exports = {

	login: function(req, res) {
		console.log('came into controller.login server')
		User.findOne(req.body, function(err, userFound) {
			if (userFound == null) {
				var newUser = new User(req.body);
				newUser.save(function(err, newUse) {
					if(err) {
						console.log(err);
					} else {
						req.session.currentUserId = newUse._id;
						console.log('new user was created')
						res.json(newUse)
					}
				})
			} else {
				req.session.currentUserId = userFound._id;
				console.log('existing user was loaded! ', userFound.name)
				res.json(userFound);
			}
		})
	},
	getAttempts: function (req, res) {
		Attempt.find({}).populate('_user').sort('-percentage').exec(function (err, allAttemps) {
			if (err) {
				console.log('error while getting all attempts', err)
			} else {
				res.json(allAttemps)
			}
		})
	},
	createQuestion: function (req, res) {
		if (req.body.question.length >= 15 && req.body.answer && req.body.fAnswer1 && req.body.fAnswer2) {
			var newQuestion = new Question(req.body);
			newQuestion.save(function (err) {
				if (err) {
					console.log('error saving and creating new question ', err)
				} else {
					res.json({status: 'it went well', newQuestion})
				}
			})
		} else {
			res.json({error: 'Question should be at least 15 characters long and answers should not be empty!!'})
		}
	},
	current: function(req, res) {
		User.findOne({_id: req.session.currentUserId}, function(err, currents) {
			if(err) {
				console.log('Error while getting current User ', err)
			} else {
				res.json(currents)
			}
		})
	},
	getQuestions: function (req, res) {
		Question.find({}, function(err, allOfThem) {
			if(err) {
				console.log('Error getting all questions', err)
			} else {
				res.json(allOfThem)
			}
		})
	},
	checkAnswers: function (req, res) {
		var score = 0;
		var questionCount = 0
		for ( var answer in req.body.answers) {
			if (!req.body.answers[answer]) {
				res.json({error: 'Please fill out all of them'})
				return
			} else {
				if(req.body.answers[answer] === req.body.questions[answer].answer) {
					score += 1;
				}
			}
				questionCount += 1;

		}
		var outOf = score + '/' + questionCount;
		var percentaged = ((score/questionCount)*100).toFixed(2);
		// res.json({out: outOf, per: percentage})
		var newAttempt = new Attempt({_user: req.session.currentUserId, score: outOf, percentage: percentaged})
		newAttempt.save(function(err) {
			if (err) {
				console.log("There was error creating an attempt ", err)
			} else {
				res.json(newAttempt)
			}
		})
	},
	checkCurrent: function(req,res) {
		console.log('coming into checkCurrent')
		if(req.session.currentUserId) {
			res.json({answer: true})
		} else {
			res.json({answer: false})
		}
	},
	logout: function(req, res) {
		console.log('logging out')
		req.session.destroy();
		res.json({code: 'good'});
	}





	
}