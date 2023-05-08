var express = require('express');
var router = express.Router();
var {
	postMessage,
	getMessages
} = require('../service/messageService');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});




router.get('/messages', async function (req, res, next) {
	try {
		console.log(req.query);
		let resp = await getMessages(req.query.jobId);
		console.log('resp is', resp);
		res.json({
			message: resp
		});
	} catch (error) {
		console.log("error occurred", error);
		res.json({
			error: error.message
		})
	}
});

router.post('/messages', async function (req, res, next) {
	try {
		console.log(req.body);
		let resp = await postMessage(req.body);
		console.log('resp is', resp);
		res.json({
			message: resp
		});
	} catch (error) {
		console.log("error occurred", error);
		res.json({
			error: error.message
		})
	}
});
module.exports = router;