module.exports = function(app) {
  var express = require('express');
  var booksRouter = express.Router();
  var collection = [
    {
      "id": "1",
      "name": "My first book"
    },
    {
      "id": "2",
      "name": "My second book"
    },
    {
      "id": "3",
      "name": "My third book"
    },
    {
      "id": "4",
      "name": "My fourth book"
    },
    {
      "id": "5",
      "name": "My fifth book"
    }
  ];

  // index route
  booksRouter.get('/api/v1/books', function(req, res) {
    res.send({books: collection});
  });

  // route with id parameters
  booksRouter.get('/api/v1/books/:id', function(req, res) {
    res.send({books: collection[req.params.id - 1]});
  });

  // create new resource via POST
  booksRouter.post('/api/v1/books', function(req, res) {
    var new_id = collection.length + 1;
    var new_resource = req.param('book');
    new_resource['id'] = new_id;
    response = {book: new_resource}
    res.send(response);
  });

  // update resource via PUT
  booksRouter.put('/api/v1/books/:id', function(req, res) {
    var resource = req.param('book');
    resource['id'] = req.params.id;
    collection[req.params.id - 1] = resource;
    response = {book: collection[req.params.id - 1]}
    res.send(response);
  });

  app.use('/', booksRouter);
};
