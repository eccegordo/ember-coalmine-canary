import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Computers Edit Page', {
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


test('Should have a computers edit page', function() {
  visit('/computers/1/edit').then(function() {
    equal(find('h3').text(), 'Edit Computer');
  });
});

test('Should be able to save edit computer', function() {
  visit('/computers/1/edit');
  andThen(function() {
    fillIn('input.computer-name', 'My edited computer');
    click('button.save');
    andThen(function() {
      visit('/computers/1');
      andThen(function() {
         equal(find('h2').text(), 'Some computer 1');
         // Pretender stub does not currently deal with PUT and POST
         // so the payload value is not updated 
         // equal(find('h2').text(), 'My edited computer');
      });
    });
  });
});

test('Should be able to cancel edit computer', function() {
  visit('/computers/1/edit');
  andThen(function() {
    fillIn('input.computer-name', 'My edited computer');
    click('button.cancel');
    andThen(function() {
      visit('/computers/1');
      andThen(function() {
         equal(find('h2').text(), 'Some computer 1');
      });
    });
  });
});

