'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Carousel = require('./Carousel');

var _Carousel2 = _interopRequireDefault(_Carousel);

var _wordpress = require('../../utils/wordpress');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CarouselSlide = function CarouselSlide(_ref) {
  var annotatedText = _ref.annotatedText;

  var slideNode = _react2.default.createElement(
    'span',
    null,
    '\xA0'
  );
  if (annotatedText) {
    slideNode = (0, _wordpress.parseWpTaggedText)(annotatedText).map(function (_ref2, idx) {
      var text = _ref2.text,
          isTag = _ref2.isTag,
          tagIndex = _ref2.tagIndex;

      if (isTag) {
        return _react2.default.createElement(
          'span',
          {
            key: idx,
            className: 'homepage-hero-section__slot-tag inline-block mb1 slot-bg--' + tagIndex
          },
          text
        );
      }
      return _react2.default.createElement(
        'span',
        { key: idx },
        text
      );
    });
  }

  return _react2.default.createElement(
    'div',
    { className: 'bauta mono homepage-hero-section__body__carousel-text' },
    slideNode
  );
};

var HomePageHeroCarousel = function HomePageHeroCarousel(_ref3) {
  var data = _ref3.data;

  return _react2.default.createElement(
    'div',
    { className: 'mb4' },
    data && _react2.default.createElement(_Carousel2.default, {
      slides: data,
      slideRenderFn: function slideRenderFn(_ref4) {
        var annotatedText = _ref4.annotatedText;
        return _react2.default.createElement(CarouselSlide, { annotatedText: annotatedText });
      }
    })
  );
};

exports.default = HomePageHeroCarousel;