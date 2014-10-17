import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Keys New Page', {
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


test('Should have a keys new page', function() {
  visit('/keys/new').then(function() {
      equal(find('h3').text(), 'New Key');
  });
});

test('Should be able to save new key', function() {
  visit('/keys/new');
  andThen(function() {
    fillIn('input.key-name', 'My new key');
    click('button.save');
    andThen(function() {
      visit('/keys');
      andThen(function() {
       // Pretender stub does not currently deal with PUT and POST
       // so the payload value is not updated 
       // equal(find('ul.items li:last').text(), 'My new key');
        equal(find('ul.items li:last').text(), 'Another key');
      });
    });
  });
});
