import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Keys Show Page', {
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


test('Should have a keys show page', function() {
  visit('/keys/1').then(function() {
      equal(find('h2').text(), 'Some key 1');
  });
});

test('Should have edit link on keys show page', function() {
  visit('/keys/1').then(function() {
    equal(find('a:contains("edit")').length, 1);
  });
});

test('Should be able to navigate to edit page from keys show page', function() {
  visit('/keys/1').then(function() {
    click('a:contains("edit")').then(function() {
      equal(find('h4').text(), 'Some key 1');
    });
  });
});
