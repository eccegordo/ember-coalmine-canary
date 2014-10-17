import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Pictures Index Page', {
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


test('Should have a pictures index page', function() {
  visit('/pictures').then(function() {
      equal(find('h3').text(), 'Create New Picture');
  });
});

test('Should list all pictures', function() {
  visit('/pictures').then(function() {
    equal(find('a:contains("Some picture 1")').length, 1);
    equal(find('a:contains("Some picture 2")').length, 1);
    equal(find('a:contains("Another picture")').length, 1);
  });
});

test('Should be able to navigate to a picture page', function() {
  visit('/pictures').then(function() {
    click('a:contains("Some picture 1")').then(function() {
      equal(find('h2').text(), 'Some picture 1');
    });
  });
});

test('Should be able visit a picture page', function() {
  visit('/pictures/1').then(function() {
    equal(find('h2').text(), 'Some picture 1');
  });
});


