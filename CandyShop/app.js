var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var rating = require('./public/data/rating.json')

var candy = require('./public/data/candy.json')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/getList', function(request, response){
  response.setHeader('Content-Type', 'application/json')
  response.json(candy)
})

app.get('/getRatingsList', function(req, res){
  res.setHeader('Content-Type', 'application/json')
  res.json(rating)
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.post('/submitRating', function(req, res) {
  const { idx, rating } = req.body;

  // Read the current data from rating.json
  fs.readFile(ratingFilePath, 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading rating.json:', err);
          return res.status(500).json({ success: false, error: 'Failed to read rating data.' });
      }

      let ratings;
      try {
          ratings = JSON.parse(data);
      } catch (parseErr) {
          console.error('Error parsing rating.json:', parseErr);
          return res.status(500).json({ success: false, error: 'Failed to parse rating data.' });
      }

      // Find the candy with the matching idx
      const candy = ratings.find(item => item.idx === parseInt(idx, 10));
      if (candy) {
          candy.rating = parseInt(rating, 10);  // Update the rating

          // Write the updated ratings back to the file
          fs.writeFile(ratingFilePath, JSON.stringify(ratings, null, 2), (writeErr) => {
              if (writeErr) {
                  console.error('Error writing to rating.json:', writeErr);
                  return res.status(500).json({ success: false, error: 'Failed to save rating.' });
              }
              res.json({ success: true, updatedData: candy });
          });
      } else {
          res.status(404).json({ success: false, error: 'Candy not found.' });
      }
  });
});

module.exports = app;