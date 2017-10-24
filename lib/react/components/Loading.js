'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading(_ref) {
  var className = _ref.className,
      isActive = _ref.isActive;

  return _react2.default.createElement(
    'div',
    { className: className || 'loading' },
    isActive && _react2.default.createElement('div', { className: 'loading__container' })
  );
};

exports.default = (0, _transactionsInterfaceState.Loading)(Loading);