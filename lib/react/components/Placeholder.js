'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Placeholder = function Placeholder(_ref) {
  var children = _ref.children;

  return _react2.default.createElement(
    'div',
    { className: 'placeholder' },
    _react2.default.createElement(
      'div',
      { className: 'placeholder__item' },
      _react2.default.createElement(
        'div',
        { className: 'placeholder__item__background' },
        children
      )
    )
  );
};

exports.default = Placeholder;