import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Pages Show Page', {
  setup: function() {
    App = startApp();

                                                                                                               
    var pages = [                                                                                                
      {                                                                                                                            
        id: 1,                                                                                                                     
        name: "Some page 1"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 2,                                                                                                                     
        name: "Some page 2"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 3,                                                                                                                     
        name: "Another page"                                                                                       
      }                                                                                                                            
    ];                                                                                                                             
                                                                                                                                   
    server = new Pretender(function() {                                                                                            
      this.get("api/v1/pages", function(request) {                                            
        return [200, {"Content-Type": "application/json"}, JSON.stringify({pages: pages})];     
      });                                                                                                                          
                                                                                                                                   
      this.get("api/v1/pages/:id", function(request) {                                        
        var page = pages.find(function(page) {                     
          if (page.id === parseInt(request.params.id, 10)) {                                             
            return page;                                                                                 
          }                                                                                                                        
        });                                                                                                                        
                                                                                                                                   
        return [200, {"Content-Type": "application/json"}, JSON.stringify({pages: [page]})]; 
      });                                                                                                                          
                                                                                                                                   
      this.put(" api/v1/pages/:id", function(request){                                          
        return [202, {"Content-Type": "application/json"}, "{}"];                                                                  
      });                                                                                                                          
                                                                                                                                   
    });


  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});


test('Should have a pages show page', function() {
  visit('/pages/1').then(function() {
      equal(find('h2').text(), 'Some page 1');
  });
});

test('Should have edit link on pages show page', function() {
  visit('/pages/1').then(function() {
    equal(find('a:contains("edit")').length, 1);
  });
});

test('Should be able to navigate to edit page from pages show page', function() {
  visit('/pages/1').then(function() {
    click('a:contains("edit")').then(function() {
      equal(find('h4').text(), 'Some page 1');
    });
  });
});
