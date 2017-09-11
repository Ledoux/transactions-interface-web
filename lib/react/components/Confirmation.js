'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Confirmation = function Confirmation() {
  return _react2.default.createElement(
    'div',
    { className: 'confirmation' },
    _react2.default.createElement(
      'div',
      { className: 'confirmation__illustration' },
      _react2.default.createElement(_Icon2.default, { icon: 'confirmation' })
    ),
    _react2.default.createElement(
      'p',
      { className: 'confirmation__title' },
      'Thanks a lot for your help'
    ),
    _react2.default.createElement(
      'p',
      { className: 'confirmation__subtitle' },
      'Your changes have been submitted'
    )
  );
};

exports.default = Confirmation;