import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Apples Show Page', {
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


test('Should have a apples show page', function() {
  visit('/apples/1').then(function() {
      equal(find('h2').text(), 'Some apple 1');
  });
});

test('Should have edit link on apples show page', function() {
  visit('/apples/1').then(function() {
    equal(find('a:contains("edit")').length, 1);
  });
});

test('Should be able to navigate to edit page from apples show page', function() {
  visit('/apples/1').then(function() {
    click('a:contains("edit")').then(function() {
      equal(find('h4').text(), 'Some apple 1');
    });
  });
});
