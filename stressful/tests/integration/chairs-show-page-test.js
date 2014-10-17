import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Chairs Show Page', {
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


test('Should have a chairs show page', function() {
  visit('/chairs/1').then(function() {
      equal(find('h2').text(), 'Some chair 1');
  });
});

test('Should have edit link on chairs show page', function() {
  visit('/chairs/1').then(function() {
    equal(find('a:contains("edit")').length, 1);
  });
});

test('Should be able to navigate to edit page from chairs show page', function() {
  visit('/chairs/1').then(function() {
    click('a:contains("edit")').then(function() {
      equal(find('h4').text(), 'Some chair 1');
    });
  });
});
