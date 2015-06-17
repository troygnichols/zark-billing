import DS from 'ember-data';

export default DS.Model.extend({
  entityName: DS.attr('string'),
  clientName: DS.attr('string'),
  invoiceID: DS.attr('string'),
  issueDate: DS.attr('string'),
  dueDate: DS.attr('string'),
  subject: DS.attr('string'),

  items: DS.hasMany('item'),

  amountDue: function() {
    var sum = this.get('items').reduce(function(acc, item) {
      var amt = parseFloat(item.get('amount'));
      return acc + amt;
    }, 0);
    return parseFloat(sum, 10).toFixed(2);
  }.property('items.@each.amount')
});
