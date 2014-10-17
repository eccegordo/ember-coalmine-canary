module.exports = function(app) {
  var express = require('express');
  var chairsRouter = express.Router();
  var collection = [
    {
      "id": "1",
      "name": "My first chair"
    },
    {
      "id": "2",
      "name": "My second chair"
    },
    {
      "id": "3",
      "name": "My third chair"
    },
    {
      "id": "4",
      "name": "My fourth chair"
    },
    {
      "id": "5",
      "name": "My fifth chair"
    }
  ];

  // index route
  chairsRouter.get('/api/v1/chairs', function(req, res) {
    res.send({chairs: collection});
  });

  // route with id parameters
  chairsRouter.get('/api/v1/chairs/:id', function(req, res) {
    res.send({chairs: collection[req.params.id - 1]});
  });

  // create new resource via POST
  chairsRouter.post('/api/v1/chairs', function(req, res) {
    var new_id = collection.length + 1;
    var new_resource = req.param('chair');
    new_resource['id'] = new_id;
    response = {chair: new_resource}
    res.send(response);
  });

  // update resource via PUT
  chairsRouter.put('/api/v1/chairs/:id', function(req, res) {
    var resource = req.param('chair');
    resource['id'] = req.params.id;
    collection[req.params.id - 1] = resource;
    response = {chair: collection[req.params.id - 1]}
    res.send(response);
  });

  app.use('/', chairsRouter);
};
