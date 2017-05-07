var express = require('express');
var router = express.Router();
var insights;

function setup(appInsights) {
	insights = appInsights;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  insights.trackEvent("www.index");

  res.render('index', { title: 'Seattle Meetup Demo' });
});

module.exports = {
	router: router,
	setup: setup
};
