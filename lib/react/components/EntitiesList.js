'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EntitiesList = function EntitiesList(_ref) {
  var collection = _ref.collection,
      entities = _ref.entities;

  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Tree2.default, { json: collection })
  );
};

exports.default = (0, _transactionsInterfaceState.EntitiesList)(EntitiesList);