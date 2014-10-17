import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Apples Index Page', {
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


test('Should have a apples index page', function() {
  visit('/apples').then(function() {
      equal(find('h3').text(), 'Create New Apple');
  });
});

test('Should list all apples', function() {
  visit('/apples').then(function() {
    equal(find('a:contains("Some apple 1")').length, 1);
    equal(find('a:contains("Some apple 2")').length, 1);
    equal(find('a:contains("Another apple")').length, 1);
  });
});

test('Should be able to navigate to a apple page', function() {
  visit('/apples').then(function() {
    click('a:contains("Some apple 1")').then(function() {
      equal(find('h2').text(), 'Some apple 1');
    });
  });
});

test('Should be able visit a apple page', function() {
  visit('/apples/1').then(function() {
    equal(find('h2').text(), 'Some apple 1');
  });
});


