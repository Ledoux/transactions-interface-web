'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HamburgerButton = function HamburgerButton(_ref) {
  var isNavigationActive = _ref.isNavigationActive,
      onTopOfDarkSection = _ref.onTopOfDarkSection,
      closeNavigation = _ref.closeNavigation,
      showNavigation = _ref.showNavigation;

  var classes = (0, _classnames2.default)({
    'hamburger--active': isNavigationActive,
    'hamburger--on-dark-bg': onTopOfDarkSection
  }, 'hamburger');
  return _react2.default.createElement(
    _Link2.default,
    {
      href: '#footer',
      className: classes,
      onClick: function onClick(e) {
        e.preventDefault();
        if (!isNavigationActive) {
          showNavigation();
        } else {
          // For keyboard users.
          // Not used for mouseclicks, instead we capture clicks via dismiss overlay
          closeNavigation();
        }
      }
    },
    _react2.default.createElement(
      'div',
      { className: 'hamburger-box' },
      _react2.default.createElement('div', { className: 'hamburger-inner' })
    )
  );
};

exports.default = (0, _transactionsInterfaceState.HamburgerButton)(HamburgerButton);