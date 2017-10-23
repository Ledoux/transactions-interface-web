'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsReduxRequest = require('transactions-redux-request');

var _transactionsInterfaceState = require('transactions-interface-state');

var _EntitiesList = require('./EntitiesList');

var _EntitiesList2 = _interopRequireDefault(_EntitiesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fetcher = function Fetcher(_ref) {
  var collectionNames = _ref.collectionNames,
      queryString = _ref.queryString,
      onCollectionNameChange = _ref.onCollectionNameChange,
      onQueryStringChange = _ref.onQueryStringChange,
      selectedCollectionName = _ref.selectedCollectionName;

  return _react2.default.createElement(
    'div',
    { className: 'fetcher center' },
    _react2.default.createElement(
      'div',
      { className: 'col' },
      _react2.default.createElement(
        'div',
        null,
        '-- select a collection --'
      ),
      _react2.default.createElement(
        'select',
        { className: 'mb2', defaultValue: selectedCollectionName || '',
          onChange: onCollectionNameChange },
        _react2.default.createElement('option', { key: collectionNames.length, disabled: true }),
        collectionNames.map(function (collectionName, index) {
          return _react2.default.createElement(
            'option',
            { key: index, value: collectionName },
            collectionName
          );
        })
      ),
      _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          null,
          '-- write a query --'
        ),
        _react2.default.createElement('textarea', { style: { resize: 'none' }, onChange: onQueryStringChange,
          rows: queryString.split('\n').length + 1,
          value: queryString })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'col' },
      selectedCollectionName && _react2.default.createElement(_EntitiesList2.default, { collectionName: selectedCollectionName,
        queryString: queryString })
    )
  );
};

exports.default = (0, _transactionsInterfaceState.Fetcher)(Fetcher);