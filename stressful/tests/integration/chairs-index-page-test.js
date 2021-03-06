import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Chairs Index Page', {
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


test('Should have a chairs index page', function() {
  visit('/chairs').then(function() {
      equal(find('h3').text(), 'Create New Chair');
  });
});

test('Should list all chairs', function() {
  visit('/chairs').then(function() {
    equal(find('a:contains("Some chair 1")').length, 1);
    equal(find('a:contains("Some chair 2")').length, 1);
    equal(find('a:contains("Another chair")').length, 1);
  });
});

test('Should be able to navigate to a chair page', function() {
  visit('/chairs').then(function() {
    click('a:contains("Some chair 1")').then(function() {
      equal(find('h2').text(), 'Some chair 1');
    });
  });
});

test('Should be able visit a chair page', function() {
  visit('/chairs/1').then(function() {
    equal(find('h2').text(), 'Some chair 1');
  });
});


