'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _redux = require('redux');

var _transactionsInterfaceState = require('transactions-interface-state');

var _transactionsReduxReact = require('transactions-redux-react');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Uploader = function Uploader(_ref) {
  var children = _ref.children,
      className = _ref.className,
      handleDropUpload = _ref.handleDropUpload;

  return _react2.default.createElement(
    _reactDropzone2.default,
    { className: className || 'uploader',
      multiple: false,
      accept: 'image/*',
      onDrop: handleDropUpload },
    children || _react2.default.createElement(
      'p',
      null,
      'Drop an image or click to select a file to upload.'
    )
  );
};

var hocs = [];

if (typeof window !== 'undefined') {
  hocs.push((0, _transactionsReduxReact.withForcedProps)({
    fetch: window.fetch,
    revokeObjectURL: window.URL.revokeObjectURL
  }));
}
hocs.push(_transactionsInterfaceState.Uploader);

exports.default = _redux.compose.apply(undefined, hocs)(Uploader);