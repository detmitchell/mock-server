var quotes = require('../assets/quotes.json');

exports.getRandomQuote = function (){
  var totalAmount = quotes.length;
  var rand = Math.floor(Math.random() * totalAmount);
  return quotes[rand];
}