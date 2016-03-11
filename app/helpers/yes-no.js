import Ember from 'ember';

export function yesNo(params) {
  if (params[0]) {
    return Ember.String.htmlSafe(`<span class="yes">Yes</span>`);
  } else {
    return Ember.String.htmlSafe(`<span class="no">No</span>`);
  }
}

export default Ember.HTMLBars.makeBoundHelper(yesNo);
