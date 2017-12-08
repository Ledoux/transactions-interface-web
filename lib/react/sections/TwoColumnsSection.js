'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _components = require('../components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TwoColumnsSection = function TwoColumnsSection(_ref) {
  var _classnames2;

  var browser = _ref.browser,
      bubblesType = _ref.bubblesType,
      buttonExtraClass = _ref.buttonExtraClass,
      cta = _ref.cta,
      element = _ref.element,
      extraClass = _ref.extraClass,
      href = _ref.href,
      icon = _ref.icon,
      imageSrc = _ref.imageSrc,
      isContentRight = _ref.isContentRight,
      isFullHeight = _ref.isFullHeight,
      isGreaterThanMediumBrowser = _ref.isGreaterThanMediumBrowser,
      subtitles = _ref.subtitles,
      tag = _ref.tag,
      title = _ref.title;

  var contentElement = _react2.default.createElement(
    'div',
    { key: 0, className: 'two-columns-section__content md-col md-col-6 center flex items-center justify-center overflow-hidden' },
    _react2.default.createElement(
      'div',
      { className: 'two-columns-section__content__container' },
      _react2.default.createElement(
        'div',
        { className: (0, _classnames4.default)('two-columns-section__content__container__title', {
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
          { className: (0, _classnames4.default)('button button--alive', _defineProperty({}, buttonExtraClass, buttonExtraClass)),
            disabled: !href,
            id: 'button--' + tag,
            href: href
          },
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
    { extraClass: (0, _classnames4.default)('section two-columns-section', (_classnames2 = {}, _defineProperty(_classnames2, 'two-columns-section--' + tag, tag), _defineProperty(_classnames2, extraClass, extraClass), _classnames2)),
      isFullHeight: isGreaterThanMediumBrowser },
    isGreaterThanMediumBrowser && isContentRight ? [illustrationElement, contentElement] : [contentElement, illustrationElement]
  );
};

exports.default = (0, _reactRedux.connect)(function (_ref2) {
  var medium = _ref2.browser.greaterThan.medium;
  return { isGreaterThanMediumBrowser: medium };
})(TwoColumnsSection);