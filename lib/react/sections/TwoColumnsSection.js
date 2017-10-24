'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TwoColumnsSection = function TwoColumnsSection(_ref) {
  var buttonCta = _ref.buttonCta,
      label = _ref.label,
      imageSrc = _ref.imageSrc,
      isContentRight = _ref.isContentRight,
      isFullHeight = _ref.isFullHeight,
      isLessThanMediumBrowser = _ref.isLessThanMediumBrowser,
      subtitles = _ref.subtitles,
      title = _ref.title;

  var contentElement = _react2.default.createElement(
    'div',
    { key: 0, className: 'two-columns-section__content md-col md-col-6 center p2 flex items-center justify-center overflow-hidden' },
    _react2.default.createElement(
      'div',
      { className: 'two-columns-section__content__container__title' },
      _react2.default.createElement(
        'div',
        { className: (0, _classnames3.default)('two-columns-section__content__container__title titlee ', {
            'flex items-center justify-center': isLessThanMediumBrowser }) },
        title
      ),
      subtitles && subtitles.map(function (subtitle, index) {
        return _react2.default.createElement(
          'div',
          { key: index, className: 'mb1 subtitle' },
          subtitle
        );
      }),
      _react2.default.createElement(
        'div',
        { className: 'two-columns-section__content__container__button mb1' },
        _react2.default.createElement(
          _components.Button,
          { className: 'button button--alive' },
          buttonCta
        )
      )
    )
  );
  var illustrationElement = _react2.default.createElement(
    'div',
    { key: 1, className: 'two-columns-section__illustration md-col md-col-6 flex items-center justify-center' },
    _react2.default.createElement('img', { className: 'two-columns-section__illustration__image', src: imageSrc })
  );
  return _react2.default.createElement(
    _components.Section,
    { extraClass: (0, _classnames3.default)('two-columns-section mb2', _defineProperty({}, 'two-columns-section--' + label, label)),
      isFullHeight: true },
    !isLessThanMediumBrowser && isContentRight ? [illustrationElement, contentElement] : [contentElement, illustrationElement]
  );
};

exports.default = (0, _reactRedux.connect)(function (_ref2) {
  var medium = _ref2.browser.lessThan.medium;
  return { isLessThanMediumBrowser: medium };
})(TwoColumnsSection);