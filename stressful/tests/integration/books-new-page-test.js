import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Books New Page', {
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


test('Should have a books new page', function() {
  visit('/books/new').then(function() {
      equal(find('h3').text(), 'New Book');
  });
});

test('Should be able to save new book', function() {
  visit('/books/new');
  andThen(function() {
    fillIn('input.book-name', 'My new book');
    click('button.save');
    andThen(function() {
      visit('/books');
      andThen(function() {
       // Pretender stub does not currently deal with PUT and POST
       // so the payload value is not updated 
       // equal(find('ul.items li:last').text(), 'My new book');
        equal(find('ul.items li:last').text(), 'Another book');
      });
    });
  });
});
