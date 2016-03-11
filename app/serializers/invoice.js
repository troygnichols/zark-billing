import ApplicationSerializer from './application'
import DS from 'ember-data';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    items: {
      serialize: 'records',
      deserialize: 'records'
    }
  },

  serializeHasMany: function(snapshot, json, relationship) {
    this._super(snapshot, json, relationship);

    if (relationship.key === 'items') {
      var itemsData = json.items;
      delete json.items
      json['items_attributes'] = itemsData;
    }
  }
});
