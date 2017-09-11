'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconButton = function IconButton(props) {
  var className = props.className,
      id = props.id,
      icon = props.icon,
      text = props.text;

  return _react2.default.createElement(
    _Button2.default,
    _extends({}, props, {
      className: className || 'icon-button',
      id: id }),
    _react2.default.createElement(_Icon2.default, {
      className: (0, _classnames2.default)('icon-button__icon', {
        'col': text
      }),
      icon: icon
    }),
    _react2.default.createElement(
      'p',
      { className: 'icon-button__text col' },
      text
    )
  );
};

exports.default = IconButton;