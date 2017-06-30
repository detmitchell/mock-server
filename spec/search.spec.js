'use strict';
var expect      = require('chai').expect,
    searcher    = require('../src/util/product.search');

describe('product search',function(){
  it('should return correct results with a single keyword argument',function(){
    searcher.search('nintendo',function(err,result){
      expect(err).to.be.null;
      expect(result).to.be.an('array');
      expect(result).to.deep.equal([
        {"name": "Nintendo Switch","keywords": ["console","technology","video","games","entertainment","nintendo","switch"],"description": "Latest product from nintendo","price": 500},
        {"name": "Breath of the Wild","keywords": ["video", "games", "nintendo", "switch"],"description": "Still the only game worth buying","price": 60}
      ]);
    });
  });
  it('should return correct results with multiple space delimited keywords',function(){
    searcher.search('nintendo playstation', function(err,result){
      expect(err).to.be.null;
      expect(result).to.be.an('array');
      expect(result).to.deep.equal([
        {"name": "Nintendo Switch","keywords": ["console","technology","video","games","entertainment","nintendo","switch"],"description": "Latest product from nintendo","price": 500},
        {"name": "Playstation 4","keywords": ["console","technology","video", "games","entertainment","sony","playstation"],"description": "Latest console gaming device from Sony","price": 475},
        {"name": "Breath of the Wild","keywords": ["video", "games", "nintendo", "switch"],"description": "Still the only game worth buying","price": 60}
      ]);
    })
  });
});