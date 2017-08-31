'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSlick = require('react-slick');

var _reactSlick2 = _interopRequireDefault(_reactSlick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: allow to pass in and override the options
var sliderConfig = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  draggable: false,
  autoplaySpeed: 4000,
  cssEase: 'ease-out',
  pauseOnHover: true

  // NOTE: Slider needs an extra wrapper div inside which we cannot attach layout to,
  // because it conflicts with slick's layout classes (float etc)
};var Carousel = function (_Component) {
  _inherits(Carousel, _Component);

  function Carousel() {
    _classCallCheck(this, Carousel);

    var _this = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this));

    _this.state = {
      initialized: false
    };
    return _this;
  }

  _createClass(Carousel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ initialized: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          extraClass = _props.extraClass,
          sliderOptions = _props.sliderOptions,
          slides = _props.slides,
          slideRenderFn = _props.slideRenderFn;

      if (!slides || slides.length === 0) {
        console.warn('there is no slides in the Carousel');
        return null;
      }
      var options = Object.assign({}, sliderConfig, {
        dots: slides.length > 1,
        autoplay: slides.length > 1
      }, sliderOptions);
      var classes = (0, _classnames2.default)({
        'carousel--initialized': this.state.initialized,
        'carousel--with-dots': options.dots
      }, extraClass, 'carousel');
      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          _reactSlick2.default,
          options,
          slides.map(function (slide, index) {
            return _react2.default.createElement(
              'div',
              { key: index },
              slideRenderFn(slide)
            );
          })
        )
      );
    }
  }]);

  return Carousel;
}(_react.Component);

Carousel.propTypes = { extraClass: _propTypes2.default.string,
  slides: _propTypes2.default.array.isRequired,
  slideRenderFn: _propTypes2.default.func,
  sliderOptions: _propTypes2.default.object
};

exports.default = Carousel;