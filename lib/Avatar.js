'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Avatar = function Avatar(_ref) {
  var className = _ref.className,
      imageUrl = _ref.imageUrl;

  return _react2.default.createElement('img', {
    className: className || 'avatar',
    src: imageUrl || '/static/images/user.png'
  });
};

function mapStateToProps(state, _ref2) {
  var id = _ref2.id;

  var user = (0, _transactionsReduxNormalizer.getNormalizerEntity)(state, 'users', id);
  return {
    imageUrl: user && user.imageUrl
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(Avatar);