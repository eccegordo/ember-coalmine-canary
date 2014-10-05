import Ember from 'ember';
import Pretender from 'pretender';
import startApp from '<%= dasherizedPackageName %>/tests/helpers/start-app';

var App, server;

module('Integration - <%= capPlural %> New Page', {
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

      this.put('<%= apiNamespace %>/<%= typePlural %>/:id', function(request){
        return [202, {"Content-Type": "application/json"}, "{}"];
      });

    });


  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});


test('Should have a <%= typePlural %> new page', function() {
  visit('/<%= typePlural %>/new').then(function() {
      equal(find('h3').text(), 'New <%= capSingular %>');
  });
});


// test('Should be able to save new <%= typeSingular %>', function() {
//   visit('/<%= typePlural %>/new');
//   fillIn('input.<%= typeSingular %>-name', 'My new <%= typeSingular %>');
//   click('button.save');

//   andThen(function() {
//     equal(find('ul.items li:last').text(), 'My new <%= typeSingular %>');
//   });
// });

