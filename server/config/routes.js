var controller = require('./../controllers/controller.js');
var path = require('path');

function authenticate(req,res,next){
	if(req.session.currentUserId){
		next();
	}else{
		res.sendStatus(401);
	}
}

module.exports = function(app) {
	app.post('/api/login', controller.login);
	app.get('/api/checkCurrent', controller.checkCurrent);
	app.use(authenticate);
	app.get('/api/getAttempts', controller.getAttempts);
	app.post('/api/createQuestion', controller.createQuestion);
	app.get('/api/getCurrent', controller.current);
	app.get('/api/getAllQuestions', controller.getQuestions);
	app.post('/api/checkAnswers', controller.checkAnswers);
	app.get('/api/getOut', controller.logout);

	
	


	app.all('*', (req, res, next) => {
	  res.sendFile(path.resolve('./TriviaApp/dist/index.html'))
	})

}