import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.modal('hello-modal', {
    withParams: ['salutation', 'person']
  });
});
export default Router;


