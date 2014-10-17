import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Computers Show Page', {
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


test('Should have a computers show page', function() {
  visit('/computers/1').then(function() {
      equal(find('h2').text(), 'Some computer 1');
  });
});

test('Should have edit link on computers show page', function() {
  visit('/computers/1').then(function() {
    equal(find('a:contains("edit")').length, 1);
  });
});

test('Should be able to navigate to edit page from computers show page', function() {
  visit('/computers/1').then(function() {
    click('a:contains("edit")').then(function() {
      equal(find('h4').text(), 'Some computer 1');
    });
  });
});
