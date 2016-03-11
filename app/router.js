import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('invoices', function() {
    this.route('new');
  });

  this.resource('invoice', { path: 'invoices/:invoiceId' }, function() {
    this.route('edit');
  });

  this.route('log-time');
});

export default Router;
