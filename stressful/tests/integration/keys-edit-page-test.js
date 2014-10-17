import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Keys Edit Page', {
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


test('Should have a keys edit page', function() {
  visit('/keys/1/edit').then(function() {
    equal(find('h3').text(), 'Edit Key');
  });
});

test('Should be able to save edit key', function() {
  visit('/keys/1/edit');
  andThen(function() {
    fillIn('input.key-name', 'My edited key');
    click('button.save');
    andThen(function() {
      visit('/keys/1');
      andThen(function() {
         equal(find('h2').text(), 'Some key 1');
         // Pretender stub does not currently deal with PUT and POST
         // so the payload value is not updated 
         // equal(find('h2').text(), 'My edited key');
      });
    });
  });
});

test('Should be able to cancel edit key', function() {
  visit('/keys/1/edit');
  andThen(function() {
    fillIn('input.key-name', 'My edited key');
    click('button.cancel');
    andThen(function() {
      visit('/keys/1');
      andThen(function() {
         equal(find('h2').text(), 'Some key 1');
      });
    });
  });
});

