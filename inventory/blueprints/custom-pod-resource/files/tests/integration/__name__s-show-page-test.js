import Ember from 'ember';
import Pretender from 'pretender';
import startApp from '<%= dasherizedPackageName %>/tests/helpers/start-app';

var App, server;

module('Integration - <%= capPlural %> Show Page', {
  setup: function() {
    App = startApp();
    var <%= typePlural %> = [
      {
        id: 1,
        name: 'Some <%= typeSingular %> 1'
      },
      {
        id: 2,
        name: 'Some <%= typeSingular %> 2'
      },
      {
        id: 3,
        name: 'Another <%= typeSingular %>'
      }
    ];

    server = new Pretender(function() {
      this.get('<%= apiNamespace %>/<%= typePlural %>', function(request) {
        return [200, {"Content-Type": "application/json"}, JSON.stringify({<%= typePlural %>: <%= typePlural %>})];
      });

      this.get('<%= apiNamespace %>/<%= typePlural %>/:id', function(request) {
        var <%= typeSingular %> = <%= typePlural %>.find(function(<%= typeSingular %>) {
          if (<%= typeSingular %>.id === parseInt(request.params.id, 10)) {
            return <%= typeSingular %>;
          }
        });

        return [200, {"Content-Type": "application/json"}, JSON.stringify({<%= typeSingular %>: <%= typeSingular %>})];
      });
    });

  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});


test('Should have a <%= typePlural %> show page', function() {
  visit('/<%= typePlural %>/1').then(function() {
      equal(find('h2').text(), 'Some <%= typeSingular %> 1');
  });
});

test('Should have edit link on <%= typePlural %> show page', function() {
  visit('/<%= typePlural %>/1').then(function() {
    equal(find('a:contains("edit")').length, 1);
  });
});

// test('Should be able to navigate to edit page from <%= typePlural %> show page', function() {
//   visit('/<%= typePlural %>/1').then(function() {
//     click('a:contains("edit")').then(function() {
//       equal(find('h2').text(), 'Some <%= typeSingular %> 1');
//     });
//   });
// });
