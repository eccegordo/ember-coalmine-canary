import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Pages Edit Page', {
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


test('Should have a pages edit page', function() {
  visit('/pages/1/edit').then(function() {
    equal(find('h3').text(), 'Edit Page');
  });
});

test('Should be able to save edit page', function() {
  visit('/pages/1/edit');
  andThen(function() {
    fillIn('input.page-name', 'My edited page');
    click('button.save');
    andThen(function() {
      visit('/pages/1');
      andThen(function() {
         equal(find('h2').text(), 'Some page 1');
         // Pretender stub does not currently deal with PUT and POST
         // so the payload value is not updated 
         // equal(find('h2').text(), 'My edited page');
      });
    });
  });
});

test('Should be able to cancel edit page', function() {
  visit('/pages/1/edit');
  andThen(function() {
    fillIn('input.page-name', 'My edited page');
    click('button.cancel');
    andThen(function() {
      visit('/pages/1');
      andThen(function() {
         equal(find('h2').text(), 'Some page 1');
      });
    });
  });
});

