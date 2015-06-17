import Ember from 'ember';
import blobStream from 'npm:blob-stream';

export default Ember.Controller.extend({
  pdf: Ember.inject.service(),

  itemTypeOptions: ['Service', 'Product'],

  currencySymbol: '$',

  actions: {
    generateInvoice: function() {
      var stream = blobStream();

      stream.on('finish', function() {
        var url = this.toBlobURL('application/pdf');
        window.open(url);
      });

      this.get('pdf').createInvoice(stream, this.get('model'));
    },

    newItem: function() {
      var newItem = this.store.createRecord('item', {});
      this.get('model.items').pushObject(newItem);
    },

    removeItem: function(item) {
      Ember.A(this.get('model.items')).removeObject(item);
    }
  }
});
