'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Uploader = function (_Component) {
  _inherits(Uploader, _Component);

  function Uploader() {
    _classCallCheck(this, Uploader);

    var _this = _possibleConstructorReturn(this, (Uploader.__proto__ || Object.getPrototypeOf(Uploader)).call(this));

    _this.handleDropUpload = _this._handleDropUpload.bind(_this);
    return _this;
  }

  _createClass(Uploader, [{
    key: '_handleDropUpload',
    value: function _handleDropUpload(files) {
      var _props = this.props,
          fileName = _props.fileName,
          isOverride = _props.isOverride,
          isWithDate = _props.isWithDate,
          onUpload = _props.onUpload;

      var uploadedFile = files[0];
      uploadedFile.test = 'blablabla';
      var localFormData = new FormData();
      localFormData.append('uploader', uploadedFile);
      var url = '/upload/' + (fileName || uploadedFile.name);
      if (isWithDate) {
        var date = Date.now();
        url = url + '-' + date;
      }
      if (isOverride) {
        url = url + '?isOverride=true';
      }
      window.fetch(url, {
        body: localFormData,
        method: 'POST'
      }).then(function (result) {
        return result.json();
      }).then(function (json) {
        if (onUpload) {
          onUpload(json);
        }
        window.URL.revokeObjectURL(uploadedFile.preview);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var handleDropUpload = this.handleDropUpload;
      var _props2 = this.props,
          children = _props2.children,
          className = _props2.className;

      return _react2.default.createElement(
        _reactDropzone2.default,
        {
          className: className || 'uploader',
          multiple: false,
          accept: 'image/*',
          onDrop: handleDropUpload },
        children || _react2.default.createElement(
          'p',
          null,
          'Drop an image or click to select a file to upload.'
        )
      );
    }
  }]);

  return Uploader;
}(_react.Component);

exports.default = Uploader;