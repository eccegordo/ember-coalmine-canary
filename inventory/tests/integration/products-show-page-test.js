import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'inventory/tests/helpers/start-app';

var App, server;

module('Integration - Products Show Page', {
  setup: function() {
    App = startApp();
    var products = [
      {
        id: 1,
        name: 'Some product 1'
      },
      {
        id: 2,
        name: 'Some product 2'
      },
      {
        id: 3,
        name: 'Another product'
      }
    ];

    server = new Pretender(function() {
      this.get('api/products', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({products: products})];
      });

      this.get('api/products/:id', function(request) {
        var product = products.find(function(product) {
          if (product.id === parseInt(request.params.id, 10)) {
            return product;
          }
        });

        return [200, {"Content-Type": "application/json"}, JSON.stringify({product: product})];
      });
    });

  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});

test('Should have a products show page', function() {
  visit('/products/1').then(function() {
      equal(find('h3').text(), 'Some product 1');
  });
});
