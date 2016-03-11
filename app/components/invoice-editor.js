import Ember from 'ember';
import blobStream from 'npm:blob-stream';

export default Ember.Component.extend({
  pdf: Ember.inject.service(),

  store: Ember.inject.service(),

  itemTypeOptions: ['Service', 'Product'],

  currencySymbol: '$',

  actions: {
    save: function() {
      var self = this;
      this.get('invoice').save().then(function() {
        self.sendAction();
      });
    },

    generateInvoicePdf: function() {
      var stream = blobStream();

      stream.on('finish', function() {
        var url = this.toBlobURL('application/pdf');
        window.open(url);
      });

      this.get('pdf').createInvoice(stream, this.get('invoice'));
    },

    newItem: function() {
      var newItem = this.get('store').createRecord('item', {});
      this.get('invoice.items').pushObject(newItem);
    },

    removeItem: function(item) {
      Ember.A(this.get('invoice.items')).removeObject(item);
    }
  }
});
