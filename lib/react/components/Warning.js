'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Warning = function Warning(_ref) {
  var closeModal = _ref.closeModal,
      icon = _ref.icon,
      isModalActive = _ref.isModalActive,
      isYesOrNo = _ref.isYesOrNo,
      nextLocation = _ref.nextLocation,
      onYesClick = _ref.onYesClick,
      text = _ref.text,
      push = _ref.push,
      subtext = _ref.subtext;

  return _react2.default.createElement(
    'div',
    { className: 'warning' },
    _react2.default.createElement(
      'div',
      { className: 'warning__illustration' },
      _react2.default.createElement(_Icon2.default, { icon: icon || 'exclamation', className: 'warning__illustration__icon' })
    ),
    _react2.default.createElement(
      'div',
      { className: 'warning__text' },
      text
    ),
    _react2.default.createElement(
      'div',
      { className: 'warning__subtext' },
      subtext
    ),
    isModalActive && _react2.default.createElement(
      'div',
      { className: 'warning__modal' },
      isYesOrNo ? _react2.default.createElement(
        'div',
        { className: 'warning__modal__decision' },
        _react2.default.createElement(
          _Button2.default,
          {
            className: 'button warning__modal__decision__button',
            onClick: closeModal
          },
          'No, cancel'
        ),
        _react2.default.createElement(
          _Button2.default,
          {
            className: 'button warning__modal__decision__button',
            onClick: onYesClick
          },
          'Yes, take me to the next page'
        )
      ) : _react2.default.createElement(
        _Button2.default,
        {
          className: 'button warning__modal__decision__button',
          onClick: onYesClick
        },
        'Ok'
      )
    )
  );
};

exports.default = (0, _transactionsInterfaceState.Warning)(Warning);