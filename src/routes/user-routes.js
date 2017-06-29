var express = require('express'),
    _       = require('lodash'),
    config  = require('../config'),
    jwt     = require('jsonwebtoken')

var app = module.exports = express.Router();

var users = [{
  id: 1,
  username: 'detmitchell',
  password: 'password1'
}];

function createIdToken(user){
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5});
}

function createAccessToken() {
  return jwt.sign({
    iss: config.issuer,
    aud: config.audience,
    exp: Math.floor(Date.now() / 1000) + (60*60),
    scope: 'full_access',
    sub: 'lalaland|gonto',
    jti: genJti(),
    alg: 'HS256'
  }, config.secret);
}

function genJti() {
  let jti = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for(let i = 0; i < 16; i++){
    jti += possible.charAt(Math.floor(Math.random()* possible.length));
  }
  return jti;
}

function getUserScheme(req) {
  return {
    username: req.body.username || req.body.email,
    type: req.body.username ? 'username' : 'email',
    userSearch: req.body.username ? {'username': req.body.username} : {'email': req.body.username}
  };
}

app.post('/users', function(req, res){
  var userScheme = getUserScheme(req);

  if(!userScheme.username || !req.body.password) {
    return res.status(400).send("Missing username or password");
  }

  if(_.find(users, userScheme.userSearch)){
    return res.status(400).send('A user with that username already exists');
  }

  var profile = _.pick(req.body, userScheme.type, 'password', 'extra');
  profile.id = _.max(users, 'id').id + 1;

  users.push(profile);

  res.status(201).send({
    id_token: createIdToken(profile),
    access_token: createAccessToken()
  });
});

app.post('/sessions/create', function(req,res){
  var userScheme = getUserScheme(req);
  if(!userScheme.username || !req.body.password) {
    return res.status(400).send("Missing username or password");
  }

  var user = _.find(users, userScheme.userSearch);
  if(!user) {
    return res.status(401).send("User not found");
  }
  if(user.password !== req.body.password) {
    return res.status(401).send("The username or password doesn't match");
  }

  res.status(201).send({
    id_token: createIdToken(user),
    access_token: createAccessToken()
  });
});