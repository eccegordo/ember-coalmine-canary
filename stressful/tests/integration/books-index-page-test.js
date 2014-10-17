import Ember from 'ember';
import Pretender from 'pretender';
import startApp from 'stressful/tests/helpers/start-app';

var App, server;

module('Integration - Books Index Page', {
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


test('Should have a books index page', function() {
  visit('/books').then(function() {
      equal(find('h3').text(), 'Create New Book');
  });
});

test('Should list all books', function() {
  visit('/books').then(function() {
    equal(find('a:contains("Some book 1")').length, 1);
    equal(find('a:contains("Some book 2")').length, 1);
    equal(find('a:contains("Another book")').length, 1);
  });
});

test('Should be able to navigate to a book page', function() {
  visit('/books').then(function() {
    click('a:contains("Some book 1")').then(function() {
      equal(find('h2').text(), 'Some book 1');
    });
  });
});

test('Should be able visit a book page', function() {
  visit('/books/1').then(function() {
    equal(find('h2').text(), 'Some book 1');
  });
});


