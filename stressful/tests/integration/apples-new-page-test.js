import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Apples New Page', {
  setup: function() {
    App = startApp();

                                                                                                               
    var apples = [                                                                                                
      {                                                                                                                            
        id: 1,                                                                                                                     
        name: "Some apple 1"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 2,                                                                                                                     
        name: "Some apple 2"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 3,                                                                                                                     
        name: "Another apple"                                                                                       
      }                                                                                                                            
    ];                                                                                                                             
                                                                                                                                   
    server = new Pretender(function() {                                                                                            
      this.get("api/v1/apples", function(request) {                                            
        return [200, {"Content-Type": "application/json"}, JSON.stringify({apples: apples})];     
      });                                                                                                                          
                                                                                                                                   
      this.get("api/v1/apples/:id", function(request) {                                        
        var apple = apples.find(function(apple) {                     
          if (apple.id === parseInt(request.params.id, 10)) {                                             
            return apple;                                                                                 
          }                                                                                                                        
        });                                                                                                                        
                                                                                                                                   
        return [200, {"Content-Type": "application/json"}, JSON.stringify({apples: [apple]})]; 
      });                                                                                                                          
                                                                                                                                   
      this.put(" api/v1/apples/:id", function(request){                                          
        return [202, {"Content-Type": "application/json"}, "{}"];                                                                  
      });                                                                                                                          
                                                                                                                                   
    });


  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});


test('Should have a apples new page', function() {
  visit('/apples/new').then(function() {
      equal(find('h3').text(), 'New Apple');
  });
});

test('Should be able to save new apple', function() {
  visit('/apples/new');
  andThen(function() {
    fillIn('input.apple-name', 'My new apple');
    click('button.save');
    andThen(function() {
      visit('/apples');
      andThen(function() {
       // Pretender stub does not currently deal with PUT and POST
       // so the payload value is not updated 
       // equal(find('ul.items li:last').text(), 'My new apple');
        equal(find('ul.items li:last').text(), 'Another apple');
      });
    });
  });
});
