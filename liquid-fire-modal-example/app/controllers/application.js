import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['salutation', 'person'],

  actions: {
    addThing: function(){
      var numThings = this.session.get('things.length') + 1;
      var newThing = Ember.Object.create({});
      var thingName = "Thing " + numThings;
      newThing.set('name', thingName);
      this.session.get('things').pushObject(newThing);
    },

    removeThing: function(thing){
      var things = this.session.get('things');
      things.removeObject(thing);
    },

  }
});