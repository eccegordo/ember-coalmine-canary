import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:computers/show', 'Computers Show Route', {
  // Specify the other units that are required for this test.
  // needs: ['controller:application']
});

test('it exists', function() {
  var route = this.subject();
  ok(route);
});
