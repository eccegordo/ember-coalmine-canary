module.exports = function(app) {
  var express = require('express');
  var computersRouter = express.Router();
  var collection = [
    {
      "id": "1",
      "name": "My first computer"
    },
    {
      "id": "2",
      "name": "My second computer"
    },
    {
      "id": "3",
      "name": "My third computer"
    },
    {
      "id": "4",
      "name": "My fourth computer"
    },
    {
      "id": "5",
      "name": "My fifth computer"
    }
  ];

  // index route
  computersRouter.get('/api/v1/computers', function(req, res) {
    res.send({computers: collection});
  });

  // route with id parameters
  computersRouter.get('/api/v1/computers/:id', function(req, res) {
    res.send({computers: collection[req.params.id - 1]});
  });

  // create new resource via POST
  computersRouter.post('/api/v1/computers', function(req, res) {
    var new_id = collection.length + 1;
    var new_resource = req.param('computer');
    new_resource['id'] = new_id;
    response = {computer: new_resource}
    res.send(response);
  });

  // update resource via PUT
  computersRouter.put('/api/v1/computers/:id', function(req, res) {
    var resource = req.param('computer');
    resource['id'] = req.params.id;
    collection[req.params.id - 1] = resource;
    response = {computer: collection[req.params.id - 1]}
    res.send(response);
  });

  app.use('/', computersRouter);
};
