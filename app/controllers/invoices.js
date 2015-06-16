import Ember from 'ember';

export default Ember.Controller.extend({
  pdf: Ember.inject.service(),

  actions: {
    generateInvoice: function() {
      var doc = this.get('pdf').createInvoice({
        entityName: 'Troy Nichols',
        clientName: 'Onsite Health Diagnostics',
        invoiceID:  '2',
        issueDate:  '06/15/2015',
        dueDate:    '06/30/2015 (Net 15)',
        subject:    'Software development and consuling services',
        items: [
          {
            type:         'Service',
            description:  'Development - back office ember.js rewrite',
            quantity:     '16.5 hr',
            unitPrice:    '$100.00',
            amount:       '$1,650.00'
          },
          {
            type:         'Service',
            description:  'Ember.js consulting/training',
            quantity:     '7.5 hr',
            unitPrice:    '$100.00',
            amount:       '$75.00'
          }
        ],
        amountDue:  '$2,400.00',
        notes:      'This invoice covers all of my development and consulting work for May'
      });

      console.log(doc);
    }
  }
});
