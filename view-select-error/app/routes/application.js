import Ember from 'ember';

export default Ember.Route.extend({

  model: function() {
    var data = [    
                  {foo: "foo 1", bar: "bar 1", id: 1},
                  {foo: "foo 2", bar: "bar 2", id: 2},
                  {foo: "foo 3", bar: "bar 3", id: 3},
                  {foo: "foo 4", bar: "bar 4", id: 4},
                  {foo: "foo 5", bar: "bar 5", id: 5},
               ];

    return data;
  }
});
