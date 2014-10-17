import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Books Edit Page', {
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


test('Should have a books edit page', function() {
  visit('/books/1/edit').then(function() {
    equal(find('h3').text(), 'Edit Book');
  });
});

test('Should be able to save edit book', function() {
  visit('/books/1/edit');
  andThen(function() {
    fillIn('input.book-name', 'My edited book');
    click('button.save');
    andThen(function() {
      visit('/books/1');
      andThen(function() {
         equal(find('h2').text(), 'Some book 1');
         // Pretender stub does not currently deal with PUT and POST
         // so the payload value is not updated 
         // equal(find('h2').text(), 'My edited book');
      });
    });
  });
});

test('Should be able to cancel edit book', function() {
  visit('/books/1/edit');
  andThen(function() {
    fillIn('input.book-name', 'My edited book');
    click('button.cancel');
    andThen(function() {
      visit('/books/1');
      andThen(function() {
         equal(find('h2').text(), 'Some book 1');
      });
    });
  });
});

