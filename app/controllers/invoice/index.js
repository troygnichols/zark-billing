import Ember from 'ember';
import blobStream from 'npm:blob-stream';

export default Ember.Controller.extend({
  pdf: Ember.inject.service(),

  currencySymbol: '$',

  stripeAmount: function() {
    return parseFloat(this.get('model.amountDue')).toFixed(2).replace('.', '');
  }.property('model.amountDue'),

  stripeName: function() {
    return 'Pay ' + this.get('model.entityName');
  }.property('model.entityName'),

  actions: {
    generateInvoicePdf: function() {
      var stream = blobStream();

      stream.on('finish', function() {
        var url = this.toBlobURL('application/pdf');
        window.open(url);
      });

      this.get('pdf').createInvoice(stream, this.get('model'));
    },

    deleteInvoice: function() {
      var self = this;

      if (!confirm('You sure about that?')) { return; }

      this.get('model').destroyRecord().then(function() {
        self.transitionToRoute('invoices');
      });
    },

    processStripeToken: function() {
      this.set('model.paidAt', ''+new Date());
      this.get('model').save();
    }
  }
});
