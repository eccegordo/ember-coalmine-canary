import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Computers Index Page', {
  setup: function() {
    App = startApp();

                                                                                                               
    var computers = [                                                                                                
      {                                                                                                                            
        id: 1,                                                                                                                     
        name: "Some computer 1"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 2,                                                                                                                     
        name: "Some computer 2"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 3,                                                                                                                     
        name: "Another computer"                                                                                       
      }                                                                                                                            
    ];                                                                                                                             
                                                                                                                                   
    server = new Pretender(function() {                                                                                            
      this.get("api/v1/computers", function(request) {                                            
        return [200, {"Content-Type": "application/json"}, JSON.stringify({computers: computers})];     
      });                                                                                                                          
                                                                                                                                   
      this.get("api/v1/computers/:id", function(request) {                                        
        var computer = computers.find(function(computer) {                     
          if (computer.id === parseInt(request.params.id, 10)) {                                             
            return computer;                                                                                 
          }                                                                                                                        
        });                                                                                                                        
                                                                                                                                   
        return [200, {"Content-Type": "application/json"}, JSON.stringify({computers: [computer]})]; 
      });                                                                                                                          
                                                                                                                                   
      this.put(" api/v1/computers/:id", function(request){                                          
        return [202, {"Content-Type": "application/json"}, "{}"];                                                                  
      });                                                                                                                          
                                                                                                                                   
    });


  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});


test('Should have a computers index page', function() {
  visit('/computers').then(function() {
      equal(find('h3').text(), 'Create New Computer');
  });
});

test('Should list all computers', function() {
  visit('/computers').then(function() {
    equal(find('a:contains("Some computer 1")').length, 1);
    equal(find('a:contains("Some computer 2")').length, 1);
    equal(find('a:contains("Another computer")').length, 1);
  });
});

test('Should be able to navigate to a computer page', function() {
  visit('/computers').then(function() {
    click('a:contains("Some computer 1")').then(function() {
      equal(find('h2').text(), 'Some computer 1');
    });
  });
});

test('Should be able visit a computer page', function() {
  visit('/computers/1').then(function() {
    equal(find('h2').text(), 'Some computer 1');
  });
});


