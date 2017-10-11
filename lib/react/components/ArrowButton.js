'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArrowButton = function ArrowButton(_ref) {
  var isExpanded = _ref.isExpanded,
      onExpandClick = _ref.onExpandClick;

  return _react2.default.createElement('button', { className: (0, _classnames2.default)('arrow-button', {
      'arrow-button--expanded': isExpanded }),
    onClick: onExpandClick });
};

exports.default = ArrowButton;