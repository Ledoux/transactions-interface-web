'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = function Avatar(_ref) {
  var className = _ref.className,
      imageUrl = _ref.imageUrl;

  return _react2.default.createElement('img', { className: className || 'avatar',
    src: imageUrl || '/static/images/user.png' });
};

exports.default = (0, _transactionsInterfaceState.Avatar)(Avatar);