'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logo = function Logo(_ref) {
  var onTopOfDarkSection = _ref.onTopOfDarkSection;

  var classes = (0, _classnames2.default)({
    'logo--on-dark-bg': onTopOfDarkSection
  }, 'logo icon');
  return _react2.default.createElement('img', { src: '/static/images/logo.png', className: classes });
};

Logo.propTypes = {
  onTopOfDarkSection: _propTypes2.default.bool
};

exports.default = Logo;