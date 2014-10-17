module.exports = function(app) {
  var express = require('express');
  var keysRouter = express.Router();
  var collection = [
    {
      "id": "1",
      "name": "My first key"
    },
    {
      "id": "2",
      "name": "My second key"
    },
    {
      "id": "3",
      "name": "My third key"
    },
    {
      "id": "4",
      "name": "My fourth key"
    },
    {
      "id": "5",
      "name": "My fifth key"
    }
  ];

  // index route
  keysRouter.get('/api/v1/keys', function(req, res) {
    res.send({keys: collection});
  });

  // route with id parameters
  keysRouter.get('/api/v1/keys/:id', function(req, res) {
    res.send({keys: collection[req.params.id - 1]});
  });

  // create new resource via POST
  keysRouter.post('/api/v1/keys', function(req, res) {
    var new_id = collection.length + 1;
    var new_resource = req.param('key');
    new_resource['id'] = new_id;
    response = {key: new_resource}
    res.send(response);
  });

  // update resource via PUT
  keysRouter.put('/api/v1/keys/:id', function(req, res) {
    var resource = req.param('key');
    resource['id'] = req.params.id;
    collection[req.params.id - 1] = resource;
    response = {key: collection[req.params.id - 1]}
    res.send(response);
  });

  app.use('/', keysRouter);
};
