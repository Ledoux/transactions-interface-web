'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Logo = require('./Logo');

var _Logo2 = _interopRequireDefault(_Logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmblemLink = function EmblemLink(_ref) {
  var siteLabel = _ref.siteLabel;

  return _react2.default.createElement(
    _Link2.default,
    { className: 'emblem-link flex justify-start items-center', href: '/home' },
    _react2.default.createElement(
      'div',
      { className: 'emblem-link__logo' },
      _react2.default.createElement(_Logo2.default, null)
    ),
    _react2.default.createElement(
      'div',
      { className: 'emblem-link__title' },
      siteLabel
    )
  );
};

exports.default = (0, _transactionsInterfaceState.EmblemLink)(EmblemLink);