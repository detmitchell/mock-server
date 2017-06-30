var products = require('../assets/products.json');

module.exports.search = function(keySearch, cb){
  let keys = keySearch.split(" ");
  cb(null,
    products.filter(function(o){
      if(!o.keywords) return false;
      for(let i = 0; i < keys.length; i++){
        if(o.keywords.indexOf(keys[i]) > -1) return true;  
      }
    })
  );
}