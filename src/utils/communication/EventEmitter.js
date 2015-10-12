var assign = require('./../object/assign');
var isFunction = require('./../isType/isFunction');

var EventEmitter = function() {
};

EventEmitter.prototype.on = function(type, listener) {
  // Create a naked object with no prototype so we can safely use it as a map.
  this._listenersByType = this._listenersByType || Object.create(null);

  var listeners = this._listenersByType[type];

  if (!listeners) {
    listeners = this._listenersByType[type] = [];
  }

  listeners.push(listener);

  return this.off.bind(this, type, listener);
};

EventEmitter.prototype.once = function(type, listener) {
  var off = this.on(type, function(args) {
    off();
    listener(args);
  });
};

EventEmitter.prototype.trigger = function(type, args) {
  if (!this._listenersByType) {
    return;
  }

  var listeners = this._listenersByType[type];

  if (!listeners) {
    return;
  }

  // Create copy so if a listener calls off() to remove itself or another while we're looping
  // through listeners we don't have issues.
  listeners = listeners.slice();

  setTimeout(function() {
    for (var i = 0, len = listeners.length; i < len; i++) {
      listeners[i](args);
    }
  }, 0);
};

EventEmitter.prototype.off = function(type, listener) {
  if (!this._listenersByType) {
    return;
  }

  var listeners = this._listenersByType[type];

  if (!listeners) {
    return;
  }

  var index = listeners.indexOf(listener);

  if (index > -1) {
    listeners.splice(index, 1);
  }
};

EventEmitter.mixin = function(obj) {
  assign(isFunction(obj) ? obj.prototype : obj, EventEmitter.prototype);
};

module.exports = EventEmitter;