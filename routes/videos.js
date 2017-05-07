var express = require('express');
var db = require('../db.js');
var router = express.Router();

/* GET video page. */
router.get('/:term', function(req, res, next) {
  var term = req.params.term;
  
  if (term) {
    var videos = db.getVideos(term, function(videos) {
        res.render('videos', { title: 'Videos for ' + term, result: videos });
    });
  }
  else {
    next();
  }
});

module.exports = router;
