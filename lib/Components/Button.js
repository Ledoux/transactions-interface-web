'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// prevent creating new function every time default prop onClick is required
var noop = function noop() {};

var Button = function Button(_ref) {
  var children = _ref.children,
      className = _ref.className,
      disabled = _ref.disabled,
      download = _ref.download,
      href = _ref.href,
      id = _ref.id,
      onClick = _ref.onClick,
      onMouseDown = _ref.onMouseDown,
      onMouseOver = _ref.onMouseOver,
      target = _ref.target,
      type = _ref.type;

  var classes = className || 'button';
  if (href) {
    return _react2.default.createElement(
      _Link2.default,
      {
        className: classes,
        id: id,
        download: download,
        href: href,
        target: target,
        onClick: onClick
      },
      children
    );
  }
  return _react2.default.createElement(
    'button',
    {
      className: classes,
      disabled: disabled,
      download: download,
      id: id,
      onClick: onClick,
      onMouseDown: onMouseDown,
      onMouseOver: onMouseOver,
      type: type
    },
    children
  );
};

Button.propTypes = {
  children: _propTypes2.default.any,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  href: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired,
  target: _propTypes2.default.string,
  type: _propTypes2.default.string
};

Button.defaultProps = {
  onClick: noop
};

exports.default = Button;