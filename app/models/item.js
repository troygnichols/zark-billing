import DS from 'ember-data';

export default DS.Model.extend({
  itemType:    DS.attr('string'),
  description: DS.attr('string'),
  quantity:    DS.attr('number'),
  unitPrice:   DS.attr('number'),

  amount: function() {
    var q = this.get('quantity'),
        p = this.get('unitPrice');

    if (!q || !p) { return 0; }

    var amt = q * p;
    return parseFloat(amt, 10).toFixed(2);
  }.property('quantity', 'unitPrice')
});
