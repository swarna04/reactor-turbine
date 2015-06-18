var bubbly = require('bubbly');
var addLiveEventListener = require('addLiveEventListener');

var clickBubbly = bubbly();

module.exports = function(trigger, settings) {
  clickBubbly.addListener(settings, trigger);

  if (settings.eventHandlerOnElement) {
    addLiveEventListener(settings.selector, 'click', clickBubbly.evaluateEvent);
  } else {
    document.addEventListener('click', clickBubbly.evaluateEvent);
  }
};