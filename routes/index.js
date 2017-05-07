var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  req.app.locals.insights.trackEvent("www.index");

  res.render('index', { title: 'Seattle Meetup Demo' });
});

module.exports = router;
