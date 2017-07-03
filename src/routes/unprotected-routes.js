var express = require('express'),
    jwt     = require('express-jwt'),
    async   = require('async'),
    config  = require('../config'),
    quoter  = require('../util/quoter'),
    searcher  = require('../util/product.search');

var app = module.exports = express.Router();

app.get('/api/random-quote', function(req, res){
  res.status(200).send(quoter.getRandomQuote());
});

app.post('/api/product-search', function(req, res){
  console.log('product search requested for paramaters:'+req.body)
  if(!req.body || !req.body.keySearch){
    res.status(400).send('Please enter some keywords to search');
  }
  searcher.search(req.body.keySearch, function(err, resp){
    res.status(err ? 400 : 200).send(err ? err : resp);
  });
})