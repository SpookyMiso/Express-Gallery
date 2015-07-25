var express = require('express');
var app = express();
var db = require('./models');
var path = require('path');

var config = require('./config/config.json');
var bodyParser = require('body-parser');

var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

app.set('views','./views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));

/////////   MIDDLEWARE    /////////


app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {

    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

/////////   END MIDDLEWARE    /////////


/////////   INDEX   /////////

app.get('/', function (req, res) {
  db.Photo.findAll()
    .then(function (pictures) {
      res.render('index', {pictures: pictures});
    });
});

/////////   END INDEX   /////////


/////////   GALLERY   /////////

app.get('/gallery', function (req, res) {
  db.Photo.findAll()
    .then(function (pictures) {
      res.render('gallery', {pictures: pictures});
    });
});

app.post('/gallery', function (req, res, next) {
  db.Photo.create ({
    author: req.body.author,
    description: req.body.description,
    url: req.body.link
  });
  res.redirect('/');
});

app.get('/gallery/:id', function (req, res) {
  db.Photo.findById(req.params.id)
    .then(function (pictures) {
      res.render('gallery', {pictures: pictures});
    });
});

/////////   END GALLERY   /////////


/////////   NEW PHOTO   /////////

app.get('/new_photo', function (req, res) {
      res.render('new_photo');
});

/////////   END NEW PHOTO   /////////




db.sequelize
  .sync()
  .then(function () {
    var server = app.listen(8080, function () {
      console.log('Crackin down on crime.');
    });
  });

