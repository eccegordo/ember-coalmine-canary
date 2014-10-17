import {
  moduleForModel,
  test
} from 'ember-qunit';

moduleForModel('book', 'Book Model', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function() {
  var model = this.subject();
  // var store = this.store();
  ok(!!model);
});


test('it has name property', function() {
  var model = this.subject({ name: 'Some book item' });
  // var store = this.store();
  equal(model.get('name'), 'Some book item');
  ok(!!model);
});
