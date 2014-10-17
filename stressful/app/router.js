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



});

export default Router;
