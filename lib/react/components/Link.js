'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(props) {
  var useAnchor = props.target && props.target === '_blank' || props.download || props.external;
  var linkProps = (0, _lodash2.default)({}, props);
  var LinkComponent = useAnchor ? 'a' : _reactRouterDom.Link;
  delete linkProps.external;
  if (typeof props.href === 'undefined' && props.onClick) {
    return _react2.default.createElement('button', props);
  } else {
    return _react2.default.createElement(LinkComponent, _extends({}, linkProps, { to: props.href }));
  }
};

exports.default = Link;