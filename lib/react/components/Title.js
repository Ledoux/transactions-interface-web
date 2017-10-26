'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Title = function Title(_ref) {
  var className = _ref.className,
      icon = _ref.icon,
      text = _ref.text;

  return _react2.default.createElement(
    'div',
    { className: className || 'title flex justify-start' },
    icon && _react2.default.createElement(_Icon2.default, { className: 'icon title__icon', icon: icon }),
    _react2.default.createElement(
      'p',
      { className: 'title__text' },
      text
    )
  );
};

exports.default = Title;