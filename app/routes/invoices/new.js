import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {

    var invoice = this.store.createRecord('invoice', {
      entityName: 'Troy Nichols',
      clientName: 'Onsite Health Diagnostics',
      invoiceID:  '2',
      issueDate:  '06/15/2015',
      dueDate:    '06/30/2015 (Net 15)',
      subject:    'Software development and consuling services',
      items: [
        this.store.createRecord('item', {
          itemType:         'Service',
          description:  'Development - back office ember.js rewrite',
          quantity:     16.5,
          unitPrice:    100.00,
        }),
        this.store.createRecord('item', {
          itemType:         'Service',
          description:  'Ember.js consulting/training',
          quantity:     7.5,
          unitPrice:    100.00,
        })
      ],
      notes:      'This invoice covers all of my development and consulting work for May'
    });

    return invoice;
  },

  actions: {
    willTransition: function(transition) {
      if (this.get('currentModel.isNew')) {
        this.get('currentModel').deleteRecord();
      }
    }
  }
});
