import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Books Show Page', {
  setup: function() {
    App = startApp();

                                                                                                               
    var books = [                                                                                                
      {                                                                                                                            
        id: 1,                                                                                                                     
        name: "Some book 1"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 2,                                                                                                                     
        name: "Some book 2"                                                                                        
      },                                                                                                                           
      {                                                                                                                            
        id: 3,                                                                                                                     
        name: "Another book"                                                                                       
      }                                                                                                                            
    ];                                                                                                                             
                                                                                                                                   
    server = new Pretender(function() {                                                                                            
      this.get("api/v1/books", function(request) {                                            
        return [200, {"Content-Type": "application/json"}, JSON.stringify({books: books})];     
      });                                                                                                                          
                                                                                                                                   
      this.get("api/v1/books/:id", function(request) {                                        
        var book = books.find(function(book) {                     
          if (book.id === parseInt(request.params.id, 10)) {                                             
            return book;                                                                                 
          }                                                                                                                        
        });                                                                                                                        
                                                                                                                                   
        return [200, {"Content-Type": "application/json"}, JSON.stringify({books: [book]})]; 
      });                                                                                                                          
                                                                                                                                   
      this.put(" api/v1/books/:id", function(request){                                          
        return [202, {"Content-Type": "application/json"}, "{}"];                                                                  
      });                                                                                                                          
                                                                                                                                   
    });


  },
  teardown: function() {
    Ember.run(App, 'destroy');
    server.shutdown();
  }
});


test('Should have a books show page', function() {
  visit('/books/1').then(function() {
      equal(find('h2').text(), 'Some book 1');
  });
});

test('Should have edit link on books show page', function() {
  visit('/books/1').then(function() {
    equal(find('a:contains("edit")').length, 1);
  });
});

test('Should be able to navigate to edit page from books show page', function() {
  visit('/books/1').then(function() {
    click('a:contains("edit")').then(function() {
      equal(find('h4').text(), 'Some book 1');
    });
  });
});
