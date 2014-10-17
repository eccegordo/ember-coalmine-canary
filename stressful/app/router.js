import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  // this.resource('foos', function() { 
  //   this.route('show', { path: ':foo_id' });
  //   this.route('new');
  //   this.route('edit', { path: ':foo_id/edit' });
  // });

  this.resource('apples', function() { 
    this.route('show', { path: ':apple_id' });
    this.route('new');
    this.route('edit', { path: ':apple_id/edit' });
  });


  this.resource('books', function() { 
    this.route('show', { path: ':book_id' });
    this.route('new');
    this.route('edit', { path: ':book_id/edit' });
  });

  this.resource('chairs', function() { 
    this.route('show', { path: ':chair_id' });
    this.route('new');
    this.route('edit', { path: ':chair_id/edit' });
  });

  this.resource('pictures', function() { 
    this.route('show', { path: ':picture_id' });
    this.route('new');
    this.route('edit', { path: ':picture_id/edit' });
  });

  this.resource('pages', function() { 
    this.route('show', { path: ':page_id' });
    this.route('new');
    this.route('edit', { path: ':page_id/edit' });
  });

  this.resource('keys', function() { 
    this.route('show', { path: ':key_id' });
    this.route('new');
    this.route('edit', { path: ':key_id/edit' });
  });

  this.resource('computers', function() { 
    this.route('show', { path: ':computer_id' });
    this.route('new');
    this.route('edit', { path: ':computer_id/edit' });
  });

});

export default Router;
