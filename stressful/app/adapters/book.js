// app/adapters/book.js
import DS from "ember-data";

export default DS.RESTAdapter.extend({
  namespace: 'api/v1'
});
