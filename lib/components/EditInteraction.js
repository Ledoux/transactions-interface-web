'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Root = require('../containers/Root');

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditInteraction = function EditInteraction(_ref) {
  var entityName = _ref.entityName,
      slug = _ref.slug;

  return _react2.default.createElement(_IconButton2.default, {
    className: 'button button--alive graph-interaction',
    icon: 'eye',
    href: '/content/check/' + entityName + '/' + slug
  });
};

exports.default = EditInteraction;