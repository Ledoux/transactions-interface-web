'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _components = require('./react/components');

Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});

var _sections = require('./react/sections');

Object.keys(_sections).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sections[key];
    }
  });
});