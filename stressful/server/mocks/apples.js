module.exports = function(app) {
  var express = require('express');
  var applesRouter = express.Router();
  var collection = [
    {
      "id": "1",
      "name": "My first apple"
    },
    {
      "id": "2",
      "name": "My second apple"
    },
    {
      "id": "3",
      "name": "My third apple"
    },
    {
      "id": "4",
      "name": "My fourth apple"
    },
    {
      "id": "5",
      "name": "My fifth apple"
    }
  ];

  // index route
  applesRouter.get('/api/v1/apples', function(req, res) {
    res.send({apples: collection});
  });

  // route with id parameters
  applesRouter.get('/api/v1/apples/:id', function(req, res) {
    res.send({apples: collection[req.params.id - 1]});
  });

  // create new resource via POST
  applesRouter.post('/api/v1/apples', function(req, res) {
    var new_id = collection.length + 1;
    var new_resource = req.param('apple');
    new_resource['id'] = new_id;
    response = {apple: new_resource}
    res.send(response);
  });

  // update resource via PUT
  applesRouter.put('/api/v1/apples/:id', function(req, res) {
    var resource = req.param('apple');
    resource['id'] = req.params.id;
    collection[req.params.id - 1] = resource;
    response = {apple: collection[req.params.id - 1]}
    res.send(response);
  });

  app.use('/', applesRouter);
};
