import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('route:pages/new', 'Pages New Route', {
  // Specify the other units that are required for this test.
  // needs: ['controller:application']
});

test('it exists', function() {
  var route = this.subject();
  ok(route);
});