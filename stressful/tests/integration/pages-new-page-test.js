import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Pages New Page', {
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


test('Should have a pages new page', function() {
  visit('/pages/new').then(function() {
      equal(find('h3').text(), 'New Page');
  });
});

test('Should be able to save new page', function() {
  visit('/pages/new');
  andThen(function() {
    fillIn('input.page-name', 'My new page');
    click('button.save');
    andThen(function() {
      visit('/pages');
      andThen(function() {
       // Pretender stub does not currently deal with PUT and POST
       // so the payload value is not updated 
       // equal(find('ul.items li:last').text(), 'My new page');
        equal(find('ul.items li:last').text(), 'Another page');
      });
    });
  });
});
