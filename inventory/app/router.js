import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

  this.resource('products', function() { 
    this.route('show', { path: ':id' });
    this.route('new');
    this.route('edit', { path: ':id/edit' });
  });

});

export default Router;
