'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputButton = function InputButton(_ref) {
  var cta = _ref.cta,
      onButtonClick = _ref.onButtonClick,
      onInputChange = _ref.onInputChange,
      placeholder = _ref.placeholder;

  return _react2.default.createElement(
    'div',
    { className: 'input-button' },
    _react2.default.createElement('input', { className: 'input-button__input mr1',
      onChange: onInputChange,
      placeholder: placeholder }),
    _react2.default.createElement(
      _Button2.default,
      { className: 'button button--alive', onClick: onButtonClick },
      cta
    )
  );
};

exports.default = (0, _transactionsInterfaceState.InputButton)(InputButton);