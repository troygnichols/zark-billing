import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    saveComplete: function() {
      this.transitionToRoute('invoices');
    }
  }
});
