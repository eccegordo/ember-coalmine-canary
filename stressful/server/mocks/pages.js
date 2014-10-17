module.exports = function(app) {
  var express = require('express');
  var pagesRouter = express.Router();
  var collection = [
    {
      "id": "1",
      "name": "My first page"
    },
    {
      "id": "2",
      "name": "My second page"
    },
    {
      "id": "3",
      "name": "My third page"
    },
    {
      "id": "4",
      "name": "My fourth page"
    },
    {
      "id": "5",
      "name": "My fifth page"
    }
  ];

  // index route
  pagesRouter.get('/api/v1/pages', function(req, res) {
    res.send({pages: collection});
  });

  // route with id parameters
  pagesRouter.get('/api/v1/pages/:id', function(req, res) {
    res.send({pages: collection[req.params.id - 1]});
  });

  // create new resource via POST
  pagesRouter.post('/api/v1/pages', function(req, res) {
    var new_id = collection.length + 1;
    var new_resource = req.param('page');
    new_resource['id'] = new_id;
    response = {page: new_resource}
    res.send(response);
  });

  // update resource via PUT
  pagesRouter.put('/api/v1/pages/:id', function(req, res) {
    var resource = req.param('page');
    resource['id'] = req.params.id;
    collection[req.params.id - 1] = resource;
    response = {page: collection[req.params.id - 1]}
    res.send(response);
  });

  app.use('/', pagesRouter);
};
