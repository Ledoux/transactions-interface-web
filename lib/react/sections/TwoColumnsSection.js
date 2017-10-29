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
  var browser = _ref.browser,
      bubblesType = _ref.bubblesType,
      cta = _ref.cta,
      element = _ref.element,
      label = _ref.label,
      href = _ref.href,
      icon = _ref.icon,
      imageSrc = _ref.imageSrc,
      isContentRight = _ref.isContentRight,
      isFullHeight = _ref.isFullHeight,
      isGreaterThanMediumBrowser = _ref.isGreaterThanMediumBrowser,
      subtitles = _ref.subtitles,
      title = _ref.title;

  var contentElement = _react2.default.createElement(
    'div',
    { key: 0, className: 'two-columns-section__content md-col md-col-6 center flex items-center justify-center overflow-hidden' },
    _react2.default.createElement(
      'div',
      { className: 'two-columns-section__content__container' },
      _react2.default.createElement(
        'div',
        { className: (0, _classnames3.default)('two-columns-section__content__container__title', {
            'flex items-center justify-center': !isGreaterThanMediumBrowser }) },
        title
      ),
      _react2.default.createElement(
        'div',
        { className: 'two-columns-section__content__container__subtitles' },
        subtitles && subtitles.map(function (subtitle, index) {
          return _react2.default.createElement(
            'div',
            { key: index, className: 'two-columns-section__content__container__subtitles__item' },
            subtitle
          );
        })
      ),
      cta && _react2.default.createElement(
        'div',
        { className: 'two-columns-section__content__container__button' },
        _react2.default.createElement(
          _components.Button,
          { className: 'button button--alive',
            disabled: !href,
            href: href },
          cta
        )
      )
    )
  );
  var illustrationElement = _react2.default.createElement(
    'div',
    { key: 1,
      className: 'two-columns-section__illustration md-col md-col-6 flex items-center justify-center' },
    bubblesType && _react2.default.createElement(_components.Icon, { className: 'two-columns-section__illustration__bubbles\n        two-columns-section__illustration__bubbles--' + bubblesType,
      icon: 'bubbles_' + bubblesType }),
    imageSrc ? _react2.default.createElement('img', { className: 'two-columns-section__illustration__image', src: imageSrc }) : icon ? _react2.default.createElement(_components.Icon, { className: 'two-columns-section__illustration__icon', icon: icon }) : element
  );
  return _react2.default.createElement(
    _components.Section,
    { extraClass: (0, _classnames3.default)('two-columns-section', _defineProperty({}, 'two-columns-section--' + label, label)),
      isFullHeight: isGreaterThanMediumBrowser },
    isGreaterThanMediumBrowser && isContentRight ? [illustrationElement, contentElement] : [contentElement, illustrationElement]
  );
};

exports.default = (0, _reactRedux.connect)(function (_ref2) {
  var medium = _ref2.browser.greaterThan.medium;
  return { isGreaterThanMediumBrowser: medium };
})(TwoColumnsSection);