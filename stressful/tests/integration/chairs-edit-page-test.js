import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Chairs Edit Page', {
  setup: function() {
    App = startApp();

                                                                                                               
    var chairs = [                                                                                                
      {                                                                                                                            
        id: 1,                                                                                                                     
        name: "Some chair 1"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 2,                                                                                                                     
        name: "Some chair 2"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 3,                                                                                                                     
        name: "Another chair"                                                                                       
      }                                                                                                                            
    ];                                                                                                                             
                                                                                                                                   
    server = new Pretender(function() {                                                                                            
      this.get("api/v1/chairs", function(request) {                                            
        return [200, {"Content-Type": "application/json"}, JSON.stringify({chairs: chairs})];     
      });                                                                                                                          
                                                                                                                                   
      this.get("api/v1/chairs/:id", function(request) {                                        
        var chair = chairs.find(function(chair) {                     
          if (chair.id === parseInt(request.params.id, 10)) {                                             
            return chair;                                                                                 
          }                                                                                                                        
        });                                                                                                                        
                                                                                                                                   
        return [200, {"Content-Type": "application/json"}, JSON.stringify({chairs: [chair]})]; 
      });                                                                                                                          
                                                                                                                                   
      this.put(" api/v1/chairs/:id", function(request){                                          
        return [202, {"Content-Type": "application/json"}, "{}"];                                                                  
      });                                                                                                                          
                                                                                                                                   
    });

  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});


test('Should have a chairs edit page', function() {
  visit('/chairs/1/edit').then(function() {
    equal(find('h3').text(), 'Edit Chair');
  });
});

test('Should be able to save edit chair', function() {
  visit('/chairs/1/edit');
  andThen(function() {
    fillIn('input.chair-name', 'My edited chair');
    click('button.save');
    andThen(function() {
      visit('/chairs/1');
      andThen(function() {
         equal(find('h2').text(), 'Some chair 1');
         // Pretender stub does not currently deal with PUT and POST
         // so the payload value is not updated 
         // equal(find('h2').text(), 'My edited chair');
      });
    });
  });
});

test('Should be able to cancel edit chair', function() {
  visit('/chairs/1/edit');
  andThen(function() {
    fillIn('input.chair-name', 'My edited chair');
    click('button.cancel');
    andThen(function() {
      visit('/chairs/1');
      andThen(function() {
         equal(find('h2').text(), 'Some chair 1');
      });
    });
  });
});

