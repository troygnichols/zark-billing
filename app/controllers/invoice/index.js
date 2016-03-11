import Ember from 'ember';
import blobStream from 'npm:blob-stream';

export default Ember.Controller.extend({
  pdf: Ember.inject.service(),

  currencySymbol: '$',

  actions: {
    generateInvoicePdf: function() {
      var stream = blobStream();

      stream.on('finish', function() {
        var url = this.toBlobURL('application/pdf');
        window.open(url);
      });

      this.get('pdf').createInvoice(stream, this.get('model'));
    },
  }
});
