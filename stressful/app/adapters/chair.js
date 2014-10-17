// app/adapters/chair.js
import DS from "ember-data";

export default DS.RESTAdapter.extend({
  namespace: 'api/v1'
});
