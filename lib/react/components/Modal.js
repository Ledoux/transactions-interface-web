'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Warning = require('./Warning');

var _Warning2 = _interopRequireDefault(_Warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function Modal(_ref) {
  var content = _ref.content,
      isActive = _ref.isActive,
      isCtaCloseButton = _ref.isCtaCloseButton,
      isCornerCloseButton = _ref.isCornerCloseButton,
      isOutCloseButton = _ref.isOutCloseButton,
      onCloseClick = _ref.onCloseClick;

  var classes = (0, _classnames2.default)({
    'modal--active': isActive
  }, 'modal');
  return _react2.default.createElement(
    'div',
    { className: classes,
      role: 'dialog',
      onClick: isOutCloseButton && onCloseClick
    },
    _react2.default.createElement(
      'div',
      {
        className: 'modal__dialog',
        role: 'document',
        onClick: function onClick(e) {
          e.nativeEvent.stopImmediatePropagation(); // Prevent click bubbling and closing modal
          e.stopPropagation();
        }
      },
      isCornerCloseButton && _react2.default.createElement(
        'button',
        {
          type: 'button',
          className: 'button button--plain modal__close',
          onClick: onCloseClick
        },
        '\u2715'
      ),
      _react2.default.createElement(
        'div',
        { className: 'modal__content' },
        content
      ),
      isCtaCloseButton && _react2.default.createElement(
        'div',
        { className: 'modal__close-cta' },
        _react2.default.createElement(_IconButton2.default, {
          className: 'button button--alive icon-button',
          icon: 'cross',
          onClick: onCloseClick,
          text: 'Close'
        })
      )
    )
  );
};

exports.default = (0, _transactionsInterfaceState.Modal)(Modal);