'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BellButton = function BellButton(_ref) {
  var closeInformation = _ref.closeInformation,
      isEmpty = _ref.isEmpty,
      isInformationActive = _ref.isInformationActive,
      isNewNotification = _ref.isNewNotification,
      showInformation = _ref.showInformation;

  var classes = (0, _classnames2.default)({
    'bell-button--inactivated': isEmpty
  }, 'bell-button');
  return _react2.default.createElement(
    _Button2.default,
    { className: classes,
      disabled: isEmpty,
      onClick: function onClick(e) {
        e.preventDefault();
        if (!isInformationActive && !isEmpty) {
          showInformation();
        } else {
          // For keyboard users.
          // Not used for mouseclicks, instead we capture clicks via dismiss overlay
          closeInformation();
        }
      }
    },
    _react2.default.createElement(_Icon2.default, {
      className: 'bell-button__icon',
      icon: 'bell'
    }),
    isNewNotification && _react2.default.createElement(
      'svg',
      { className: 'bell-button__alert' },
      _react2.default.createElement('circle', { className: 'bell-button__alert__circle' })
    )
  );
};

exports.default = (0, _transactionsInterfaceState.BellButton)(BellButton);