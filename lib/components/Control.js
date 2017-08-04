'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EditButton = require('./EditButton');

var _EditButton2 = _interopRequireDefault(_EditButton);

var _SubmitButton = require('./SubmitButton');

var _SubmitButton2 = _interopRequireDefault(_SubmitButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Control = function Control(_ref) {
  var getFilteredElements = _ref.getFilteredElements,
      getIsEmptyForm = _ref.getIsEmptyForm,
      history = _ref.history,
      isEdit = _ref.isEdit,
      isNew = _ref.isNew,
      requestTransactions = _ref.requestTransactions;

  return _react2.default.createElement(
    'div',
    { className: 'control flex flex-auto' },
    isEdit || isNew ? _react2.default.createElement(_SubmitButton2.default, {
      getFilteredElements: getFilteredElements,
      getIsEmptyForm: getIsEmptyForm,
      history: history,
      isEdit: isEdit,
      isNew: isNew,
      requestTransactions: requestTransactions
    }) : _react2.default.createElement(_EditButton2.default, { history: history })
  );
};

exports.default = Control;