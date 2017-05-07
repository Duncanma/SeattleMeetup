var express = require('express');
var appInsights = require('applicationinsights');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db.js');
var cache = require('node-cache');

var myCache = new cache();

var insights = appInsights.setup('87d81c29-756c-4031-b543-f8ddbe6a8cf3').start();


var app = express();
var insightClient = insights.getClient('87d81c29-756c-4031-b543-f8ddbe6a8cf3');

db.setup(insightClient);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  insightClient.trackEvent("www.index");
  res.render('index', { title: 'Seattle Meetup Demo' });
});

function renderPage(res, term, videos) {
  res.render('videos', { title: 'Videos for ' + term, result: videos });
}


/* GET video page. */
app.get('/videos/:term', function(req, res, next) {
  insightClient.trackEvent("www.videos", {term: term});
  var term = req.params.term;
  
  if (term) {
    var cacheKey = "videos-" + term;

    myCache.get(cacheKey, function(err, value) {
        if (value===undefined)
        {
          //didn't find it
          var videos = db.getVideos(term, function(videos) {
              myCache.set(cacheKey, videos, 600, function(err, success)
              {
                renderPage(res, term, videos);
              });
          });
        }
        else 
        {
            renderPage(res, term, value);
        }
    });
  }
  else {
    next();
  }
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
