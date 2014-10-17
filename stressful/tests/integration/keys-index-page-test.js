import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Keys Index Page', {
  setup: function() {
    App = startApp();

                                                                                                               
    var keys = [                                                                                                
      {                                                                                                                            
        id: 1,                                                                                                                     
        name: "Some key 1"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 2,                                                                                                                     
        name: "Some key 2"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 3,                                                                                                                     
        name: "Another key"                                                                                       
      }                                                                                                                            
    ];                                                                                                                             
                                                                                                                                   
    server = new Pretender(function() {                                                                                            
      this.get("api/v1/keys", function(request) {                                            
        return [200, {"Content-Type": "application/json"}, JSON.stringify({keys: keys})];     
      });                                                                                                                          
                                                                                                                                   
      this.get("api/v1/keys/:id", function(request) {                                        
        var key = keys.find(function(key) {                     
          if (key.id === parseInt(request.params.id, 10)) {                                             
            return key;                                                                                 
          }                                                                                                                        
        });                                                                                                                        
                                                                                                                                   
        return [200, {"Content-Type": "application/json"}, JSON.stringify({keys: [key]})]; 
      });                                                                                                                          
                                                                                                                                   
      this.put(" api/v1/keys/:id", function(request){                                          
        return [202, {"Content-Type": "application/json"}, "{}"];                                                                  
      });                                                                                                                          
                                                                                                                                   
    });


  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});


test('Should have a keys index page', function() {
  visit('/keys').then(function() {
      equal(find('h3').text(), 'Create New Key');
  });
});

test('Should list all keys', function() {
  visit('/keys').then(function() {
    equal(find('a:contains("Some key 1")').length, 1);
    equal(find('a:contains("Some key 2")').length, 1);
    equal(find('a:contains("Another key")').length, 1);
  });
});

test('Should be able to navigate to a key page', function() {
  visit('/keys').then(function() {
    click('a:contains("Some key 1")').then(function() {
      equal(find('h2').text(), 'Some key 1');
    });
  });
});

test('Should be able visit a key page', function() {
  visit('/keys/1').then(function() {
    equal(find('h2').text(), 'Some key 1');
  });
});


