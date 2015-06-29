'use strict';

module.exports = SignalEmitter;

function SignalEmitter(emitter, event) {
  // if emitter is omitted, shift args and get default emitter instance
  if(!event){
    event = emitter;
    emitter = SignalEmitter.defaultEmitter();
  }

  this.addListener = SignalEmitter._bind(emitter.addListener, emitter, event);
  this.on = SignalEmitter._bind(emitter.on, emitter, event);
  this.once = SignalEmitter._bind(emitter.once, emitter, event);
  this.removeListener = SignalEmitter._bind(emitter.removeListener, emitter, event);
  this.removeAllListeners = SignalEmitter._bind(emitter.removeAllListeners, emitter, event);
  this.listeners = SignalEmitter._bind(emitter.listeners, emitter, event);
  this.emit = SignalEmitter._bind(emitter.emit, emitter, event);
  // this.listenerCount = _.bind(EventEmitter.listenerCount, EventEmitter, emitter, event);
}

SignalEmitter._bind = function(fn, context) {
  var partials = [].slice.call(arguments, 2);

  return fn.bind(context, partials);
};

SignalEmitter.defaultEmitter = function(){
  return new require('events').EventEmitter();
};
