var logger        = require('morgan'),
    cors          = require('cors'),
    http          = require('http'),
    express       = require('express'),
    errorHandler  = require('errorhandler'),
    dotenv        = require('dotenv'),
    bodyParser    = require('body-parser'),
    routes        = require('./routes')

var app = express();

dotenv.load();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(function(err, req, res, next) {
  if(err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if(process.env.NODE_ENV === 'development'){
  app.use(logger('dev'));
  app.use(errorhandler());
}

app.use(routes.unprotectedRoutes);
app.use(routes.protectedRoutes);
app.use(routes.userRoutes);

var port = process.env.PORT || 3001;

http.createServer(app).listen(port, function(err) {
  console.log('listening on http://localhost:'+port);
})