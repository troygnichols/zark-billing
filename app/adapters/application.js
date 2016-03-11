import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'https://zark-billing-api.herokuapp.com'
});
