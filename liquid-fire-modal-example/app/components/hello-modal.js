import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['hello-modal'],
  actions: {
    gotIt: function() {
      this.sendAction('dismiss');
    }
  }
});