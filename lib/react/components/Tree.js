'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Node = require('./Node');

var _Node2 = _interopRequireDefault(_Node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tree = function Tree(props) {
  var json = props.json;

  return _react2.default.createElement(
    'div',
    { className: 'tree' },
    json && Object.keys(json).map(function (key, index) {
      return _react2.default.createElement(_Node2.default, { index: index,
        key: index,
        name: key,
        value: json[key] });
    })
  );
};

exports.default = Tree;