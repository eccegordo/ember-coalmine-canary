module.exports = function(app) {
  var express = require('express');
  var picturesRouter = express.Router();
  var collection = [
    {
      "id": "1",
      "name": "My first picture"
    },
    {
      "id": "2",
      "name": "My second picture"
    },
    {
      "id": "3",
      "name": "My third picture"
    },
    {
      "id": "4",
      "name": "My fourth picture"
    },
    {
      "id": "5",
      "name": "My fifth picture"
    }
  ];

  // index route
  picturesRouter.get('/api/v1/pictures', function(req, res) {
    res.send({pictures: collection});
  });

  // route with id parameters
  picturesRouter.get('/api/v1/pictures/:id', function(req, res) {
    res.send({pictures: collection[req.params.id - 1]});
  });

  // create new resource via POST
  picturesRouter.post('/api/v1/pictures', function(req, res) {
    var new_id = collection.length + 1;
    var new_resource = req.param('picture');
    new_resource['id'] = new_id;
    response = {picture: new_resource}
    res.send(response);
  });

  // update resource via PUT
  picturesRouter.put('/api/v1/pictures/:id', function(req, res) {
    var resource = req.param('picture');
    resource['id'] = req.params.id;
    collection[req.params.id - 1] = resource;
    response = {picture: collection[req.params.id - 1]}
    res.send(response);
  });

  app.use('/', picturesRouter);
};
