import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    // window.console.log("beforeModel: %s | this = %o", this.routeName, this);
  },

  model: function() {
    var item = this.store.createRecord('product');
    return item;
  },

  afterModel: function() {
    // window.console.log("afterModel: %s | this = %o", this.routeName, this);
  },

  setupController: function(controller, model) {
    // window.console.log("setupController: id %s | model = %o", model.get('id'), model);
    this.controller.set('model', model);
  },

  deactivate: function() {
    var model = this.get('controller.model');
    if (model.get('isNew')) {
      model.deleteRecord();
    }
  },

  actions: {
    save: function(model) {
      var self = this;
      model.save().then(function(saved) {
        self.transitionTo('products.show', saved);
      });
    },

    cancel: function() {
      this.transitionTo('products');
    }
  }

});
