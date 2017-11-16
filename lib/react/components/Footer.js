'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _InputButton = require('./InputButton');

var _InputButton2 = _interopRequireDefault(_InputButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function Footer(_ref) {
  var text = _ref.text,
      onSubscribeClick = _ref.onSubscribeClick;

  return _react2.default.createElement(
    'div',
    { className: 'footer p2 flex flex-wrap items-center justify-center' },
    _react2.default.createElement(
      'div',
      { className: 'footer__contact' },
      _react2.default.createElement(
        'div',
        { className: 'mb1' },
        'Email us for further information'
      ),
      _react2.default.createElement(
        'div',
        { className: 'footer__contact__email' },
        'info@reval.io'
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'footer__newsletter' },
      _react2.default.createElement(
        'div',
        { className: 'mb1' },
        'Sign up for project updates'
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_InputButton2.default, { cta: 'Subscribe',
          placeholder: 'Your email',
          onClick: onSubscribeClick,
          tag: 'subscribe' })
      )
    )
  );
};

exports.default = (0, _transactionsInterfaceState.Footer)(Footer);