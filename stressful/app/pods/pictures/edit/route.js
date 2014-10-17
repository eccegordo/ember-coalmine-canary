import Ember from 'ember';

export default Ember.Route.extend({

  beforeModel: function() {
    // window.console.log("beforeModel: %s | this = %o", this.routeName, this);
  },

  model: function(params) {
    var item = this.store.find('picture', params.picture_id);
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
    // treat leaving the page dirty like a cancel
    var model = this.controller.get('model');
    if (model.get('isDirty')) {
      model.rollback();
    }
  },

  actions: {
    save: function(model) {
      var self = this;
      model.save().then(function(saved) {
        self.transitionTo('pictures.show', saved);
      });
    },

    cancel: function() {
      var model = this.get('controller.model');
      if (model.get('isDirty')) {
        model.rollback();
      }
      this.transitionTo('pictures.show', model);
    }
  }

});
