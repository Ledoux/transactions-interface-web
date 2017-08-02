'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckInteraction = function CheckInteraction(_ref) {
  var entityName = _ref.entityName,
      history = _ref.history,
      slug = _ref.slug;

  return _react2.default.createElement(_IconButton2.default, {
    className: 'button button--alive check-interaction',
    icon: 'pen',
    href: '/content/check/' + entityName + '/' + slug
  });
};

exports.default = CheckInteraction;