var express = require('express'),
    jwt     = require('express-jwt'),
    config  = require('../config'),
    quoter  = require('../util/quoter')

var app = module.exports = express.Router();

app.get('/api/random-quote', function(req, res){
  res.status(200).send(quoter.getRandomQuote());
})