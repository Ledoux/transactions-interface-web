'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _transactionsInterfaceState = require('transactions-interface-state');

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Go = function Go(_ref) {
  var isBack = _ref.isBack,
      isForward = _ref.isForward,
      history = _ref.history,
      onBackClick = _ref.onBackClick,
      onForwardClick = _ref.onForwardClick;

  return _react2.default.createElement(
    'div',
    null,
    history.length > 1 && _react2.default.createElement(_IconButton2.default, { icon: 'chevron_left', onClick: onBackClick }),
    history.action === 'POP' && _react2.default.createElement(_IconButton2.default, { icon: 'chevron_right', onClick: onForwardClick })
  );
};

exports.default = (0, _reactRouter.withRouter)((0, _transactionsInterfaceState.Go)(Go));