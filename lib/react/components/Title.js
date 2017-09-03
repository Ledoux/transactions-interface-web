'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

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
    { className: className || 'title' },
    icon && _react2.default.createElement(_Icon2.default, {
      className: (0, _classnames2.default)('icon title__icon', {
        'col col-1': icon }),
      icon: icon }),
    _react2.default.createElement(
      'p',
      { className: (0, _classnames2.default)('title__text', {
          'col col-11': icon }) },
      text
    )
  );
};

exports.default = Title;