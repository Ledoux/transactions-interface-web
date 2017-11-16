'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
      placeholder = _ref.placeholder,
      tag = _ref.tag;

  return _react2.default.createElement(
    'div',
    { className: 'input-button' },
    _react2.default.createElement('input', _extends({ className: 'input-button__input mr1',
      onChange: onInputChange,
      placeholder: placeholder
    }, tag ? { id: 'input-button__input--' + tag } : null)),
    _react2.default.createElement(
      _Button2.default,
      _extends({ className: 'button button--alive',
        onClick: onButtonClick
      }, tag ? { id: 'input-button__button--' + tag } : null),
      cta
    )
  );
};

exports.default = (0, _transactionsInterfaceState.InputButton)(InputButton);