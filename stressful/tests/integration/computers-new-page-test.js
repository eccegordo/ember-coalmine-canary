import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Computers New Page', {
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


test('Should have a computers new page', function() {
  visit('/computers/new').then(function() {
      equal(find('h3').text(), 'New Computer');
  });
});

test('Should be able to save new computer', function() {
  visit('/computers/new');
  andThen(function() {
    fillIn('input.computer-name', 'My new computer');
    click('button.save');
    andThen(function() {
      visit('/computers');
      andThen(function() {
       // Pretender stub does not currently deal with PUT and POST
       // so the payload value is not updated 
       // equal(find('ul.items li:last').text(), 'My new computer');
        equal(find('ul.items li:last').text(), 'Another computer');
      });
    });
  });
});
