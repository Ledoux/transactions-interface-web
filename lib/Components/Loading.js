'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading(_ref) {
  var isActive = _ref.isActive;

  return _react2.default.createElement(
    'div',
    { className: 'loading' },
    isActive && _react2.default.createElement('div', { className: 'loading__container' })
  );
};

function mapStateToProps(_ref2) {
  var isActive = _ref2.loading.isActive;

  return {
    isActive: isActive
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(Loading);