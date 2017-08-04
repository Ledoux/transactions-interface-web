'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditButton = function EditButton(_ref) {
  var history = _ref.history;

  return _react2.default.createElement(
    _Button2.default,
    {
      className: 'button button--alive edit-button',
      onClick: function onClick() {
        history.push(window.location.pathname + '?isEdit=true');
      }
    },
    _react2.default.createElement(_Icon2.default, { className: 'icon edit-button__icon', icon: 'pen' })
  );
};

exports.default = EditButton;