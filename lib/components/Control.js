'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Control = function Control(_ref) {
  var getFilteredElements = _ref.getFilteredElements,
      getIsEmptyForm = _ref.getIsEmptyForm,
      history = _ref.history,
      requestTransactions = _ref.requestTransactions;

  return _react2.default.createElement(
    'div',
    { className: 'control flex flex-auto' },
    _react2.default.createElement(_SubmitButton2.default, {
      getFilteredElements: getFilteredElements,
      getIsEmptyForm: getIsEmptyForm,
      history: history,
      requestTransactions: requestTransactions
    })
  );
};

exports.default = Control;