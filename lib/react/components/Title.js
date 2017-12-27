'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Title = function Title(_ref) {
  var className = _ref.className,
      extraClass = _ref.extraClass,
      icon = _ref.icon,
      text = _ref.text;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames3.default)(className || 'title flex justify-start', _defineProperty({}, extraClass, extraClass)) },
    icon && _react2.default.createElement(_Icon2.default, { className: 'icon title__icon', icon: icon }),
    _react2.default.createElement(
      'div',
      { className: 'title__text' },
      text
    )
  );
};

exports.default = Title;