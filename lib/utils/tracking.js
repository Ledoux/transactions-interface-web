'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackEvent = trackEvent;
exports.trackPageView = trackPageView;
exports.trackException = trackException;
exports.trackMixpanelUser = trackMixpanelUser;
exports.trackFBPixelEvent = trackFBPixelEvent;

var _config = require('./config');

var MIXPANEL_API_TOKEN = _config.IS_PROD ? '<>' : '<>';
var TRACKING_URL = '<>';

// from http://stackoverflow.com/a/8809472
function generateUUID() {
  var d = new Date().getTime();
  if (typeof window !== 'undefined' && window.performance && typeof window.performance.now === 'function') {
    d += window.performance.now(); // use high-precision timer if available
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}

var userTrackingId = generateUUID();

function trackEvent(value, extra) {
  if (!_config.IS_PROD) {
    console.info('DEV::trackEvent', value, extra);
    return;
  }
  if (window.navigator.doNotTrack) {
    return;
  }
  if (window.ga) {
    window.ga('send', 'event', 'Click', value, extra, { 'nonInteraction': true });
  }
  if (window.mixpanel && window.mixpanel.track) {
    window.mixpanel.track(value, { 'extra': extra });
  }
  window['optimizely'] = window['optimizely'] || [];
  window.optimizely.push(['trackEvent', value]);
}

function trackPageView() {
  var pathname = window.location.pathname;
  if (!_config.IS_PROD) {
    console.info('DEV::trackPageView', pathname);
    return;
  }
  if (window.navigator.doNotTrack || !window.ga) {
    return;
  }
  window.ga('set', 'page', pathname);
  window.ga('send', 'pageview');
}

function trackException(e) {
  if (window.navigator.doNotTrack || !window.ga || !e) {
    return;
  }
  window.ga('send', 'exception', {
    exDescription: 'JavaScript Error ' + e.message + ' ' + e.filename + ': ' + e.lineno
  });
}

function trackMixpanelUser(user) {
  var http = new window.XMLHttpRequest();

  http.open('POST', TRACKING_URL, true);
  http.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  var data = {
    id: userTrackingId,
    mixpanelApiToken: MIXPANEL_API_TOKEN,
    mixpanelData: user
  };
  if (!_config.IS_PROD) {
    data.isDev = true;
  }
  http.send(JSON.stringify(data));
}

function trackFBPixelEvent(eventId, eventConfig) {
  if (_config.IS_PROD && window._fbq && !window.navigator.doNotTrack) {
    window._fbq.push(['track', eventId, eventConfig]);
  }
}