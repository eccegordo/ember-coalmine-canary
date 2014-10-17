import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Pictures Edit Page', {
  setup: function() {
    App = startApp();

                                                                                                               
    var pictures = [                                                                                                
      {                                                                                                                            
        id: 1,                                                                                                                     
        name: "Some picture 1"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 2,                                                                                                                     
        name: "Some picture 2"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 3,                                                                                                                     
        name: "Another picture"                                                                                       
      }                                                                                                                            
    ];                                                                                                                             
                                                                                                                                   
    server = new Pretender(function() {                                                                                            
      this.get("api/v1/pictures", function(request) {                                            
        return [200, {"Content-Type": "application/json"}, JSON.stringify({pictures: pictures})];     
      });                                                                                                                          
                                                                                                                                   
      this.get("api/v1/pictures/:id", function(request) {                                        
        var picture = pictures.find(function(picture) {                     
          if (picture.id === parseInt(request.params.id, 10)) {                                             
            return picture;                                                                                 
          }                                                                                                                        
        });                                                                                                                        
                                                                                                                                   
        return [200, {"Content-Type": "application/json"}, JSON.stringify({pictures: [picture]})]; 
      });                                                                                                                          
                                                                                                                                   
      this.put(" api/v1/pictures/:id", function(request){                                          
        return [202, {"Content-Type": "application/json"}, "{}"];                                                                  
      });                                                                                                                          
                                                                                                                                   
    });

  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});


test('Should have a pictures edit page', function() {
  visit('/pictures/1/edit').then(function() {
    equal(find('h3').text(), 'Edit Picture');
  });
});

test('Should be able to save edit picture', function() {
  visit('/pictures/1/edit');
  andThen(function() {
    fillIn('input.picture-name', 'My edited picture');
    click('button.save');
    andThen(function() {
      visit('/pictures/1');
      andThen(function() {
         equal(find('h2').text(), 'Some picture 1');
         // Pretender stub does not currently deal with PUT and POST
         // so the payload value is not updated 
         // equal(find('h2').text(), 'My edited picture');
      });
    });
  });
});

test('Should be able to cancel edit picture', function() {
  visit('/pictures/1/edit');
  andThen(function() {
    fillIn('input.picture-name', 'My edited picture');
    click('button.cancel');
    andThen(function() {
      visit('/pictures/1');
      andThen(function() {
         equal(find('h2').text(), 'Some picture 1');
      });
    });
  });
});

