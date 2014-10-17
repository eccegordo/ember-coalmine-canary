import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Pictures Show Page', {
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


test('Should have a pictures show page', function() {
  visit('/pictures/1').then(function() {
      equal(find('h2').text(), 'Some picture 1');
  });
});

test('Should have edit link on pictures show page', function() {
  visit('/pictures/1').then(function() {
    equal(find('a:contains("edit")').length, 1);
  });
});

test('Should be able to navigate to edit page from pictures show page', function() {
  visit('/pictures/1').then(function() {
    click('a:contains("edit")').then(function() {
      equal(find('h4').text(), 'Some picture 1');
    });
  });
});
