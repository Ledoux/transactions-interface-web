'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

var _ArrowButton = require('./ArrowButton');

var _ArrowButton2 = _interopRequireDefault(_ArrowButton);

var _Tree = require('./Tree');

var _Tree2 = _interopRequireDefault(_Tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Node = function Node(_ref) {
  var isExpanded = _ref.isExpanded,
      maxStringLength = _ref.maxStringLength,
      name = _ref.name,
      onExpandClick = _ref.onExpandClick,
      stringTypes = _ref.stringTypes,
      value = _ref.value;

  var valueType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
  var valueElement = void 0;
  if (valueType === null || stringTypes.includes(valueType)) {
    var stringValue = JSON.stringify(value);
    var _maxStringLength = _maxStringLength || 25;
    var cutLength = Math.min(_maxStringLength, stringValue.length);
    var cutStringValue = stringValue.slice(0, cutLength);
    if (cutLength === _maxStringLength) {
      cutStringValue = cutStringValue + '...';
    }
    return _react2.default.createElement(
      'div',
      { className: 'node' },
      _react2.default.createElement(
        'div',
        { className: 'node__key node__key--string col' },
        name
      ),
      _react2.default.createElement(
        'div',
        { className: 'col' },
        cutStringValue
      )
    );
  } else if (Array.isArray(value)) {
    return _react2.default.createElement(
      'div',
      { className: 'node' },
      _react2.default.createElement(
        'div',
        { className: 'node__key flex items-center' },
        _react2.default.createElement(_ArrowButton2.default, { isExpanded: isExpanded,
          onExpandClick: onExpandClick }),
        _react2.default.createElement(
          'div',
          { className: 'node__key__name' },
          name
        )
      ),
      _react2.default.createElement(
        'div',
        null,
        isExpanded && value.map(function (element, arrayIndex) {
          return _react2.default.createElement(_Tree2.default, { json: _defineProperty({}, arrayIndex, element),
            key: arrayIndex });
        })
      )
    );
  } else {
    return _react2.default.createElement(
      'div',
      { className: 'node' },
      _react2.default.createElement(
        'div',
        { className: 'node__key flex items-center' },
        _react2.default.createElement(_ArrowButton2.default, { isExpanded: isExpanded,
          onExpandClick: onExpandClick }),
        _react2.default.createElement(
          'div',
          { className: 'node__key__name' },
          name
        )
      ),
      isExpanded && _react2.default.createElement(_Tree2.default, { json: value })
    );
  }
};

Node.defaultProps = { maxStringLength: 25,
  stringTypes: ['boolean', 'number', 'string', 'undefined']
};

exports.default = (0, _transactionsInterfaceState.Node)(Node);