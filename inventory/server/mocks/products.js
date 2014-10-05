module.exports = function(app) {
  var express = require('express');
  var productsRouter = express.Router();
  productsRouter.get('/', function(req, res) {
    res.send({"products":[{id: 1, name: 'Test product'}]});
  });

  productsRouter.get('/products/1', function(req, res) {
    res.send({"product": {id: 1, name: 'Test product'}});
  });

  app.use('/api/products', productsRouter);
  app.use('/api/products/1', productsRouter);
};
