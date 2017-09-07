'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dom = require('../../utils/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // huge inspiration from https://github.com/snipsco/react-inview-monitor/blob/master/src/index.js


var ScrollingElement = function (_Component) {
  _inherits(ScrollingElement, _Component);

  function ScrollingElement(props) {
    _classCallCheck(this, ScrollingElement);

    var _this = _possibleConstructorReturn(this, (ScrollingElement.__proto__ || Object.getPrototypeOf(ScrollingElement)).call(this));

    _this.state = {
      className: props.initialClassName || ''
    };
    _this._handleScroll = _this._handleScroll.bind(_this);
    return _this;
  }

  _createClass(ScrollingElement, [{
    key: '_handleScroll',
    value: function _handleScroll() {
      var yOffset = window.pageYOffset;
      var _props = this.props,
          fixedClassName = _props.fixedClassName,
          childPropsOnScrollIntoView = _props.childPropsOnScrollIntoView,
          classNameScrolledPastView = _props.classNameScrolledPastView,
          initialClassName = _props.initialClassName;

      if (yOffset > this._scrollIntoViewThreshold) {
        if (fixedClassName || childPropsOnScrollIntoView) {
          this.setState({
            className: fixedClassName,
            childProps: childPropsOnScrollIntoView
          });
          window.removeEventListener('scroll', this._throttledScroll);
        }
      }
      if (classNameScrolledPastView) {
        var currentlyScrolledPast = yOffset > this._scrollOutOffViewThreshold;
        if (currentlyScrolledPast && !this._scrolledPast) {
          this.setState({
            className: classNameScrolledPastView
          });
          this._scrolledPast = true;
        } else if (!currentlyScrolledPast && this._scrolledPast) {
          this.setState({
            className: initialClassName
          });
          this._scrolledPast = false;
        }
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props2 = this.props,
          useInviewMonitor = _props2.useInviewMonitor,
          mountInitDelayTime = _props2.mountInitDelayTime,
          intoViewRatioShownThreshold = _props2.intoViewRatioShownThreshold;

      if (!useInviewMonitor || typeof useInviewMonitor === 'function' && !useInviewMonitor()) {
        return;
      }
      // we are about to look into the DOM for positions of elements,
      // which we will then cache and re-use to assert whether we have
      // scrolled past them etc.
      // Hence this only works if the positions we get here are correct forever,
      // as long as this element stays mounted.
      // (although if this "fails" it will only cause the scrollIntoView props
      //  to be used too early, leading "only" to too early fade-in effects etc
      //  - not absolutely critical)
      // Reasonable to try to wait for images to load,
      // but hard to know generically how long this will take;
      // depends on the site, so let the user specify.
      setTimeout(function () {
        var elementOffsetTop = (0, _dom.getElementOffset)(_this2._element).top;
        var elementHeight = _this2._element.getBoundingClientRect().height;

        // when element is just above the bottom of the screen
        _this2._scrollIntoViewThreshold = elementOffsetTop - window.innerHeight + elementHeight * intoViewRatioShownThreshold;

        // when bottom of element is just at the top of the screen (about to be scrolled past)
        _this2._scrollOutOffViewThreshold = elementOffsetTop + elementHeight - elementHeight * (1 - intoViewRatioShownThreshold);

        _this2._throttledScroll = (0, _lodash2.default)(_this2._handleScroll, 100);
        window.addEventListener('scroll', _this2._throttledScroll);
        // in case user has scrolled already
        _this2._handleScroll();
      }, mountInitDelayTime);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('scroll', this._throttledScroll);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var children = this.props.children;
      var _state = this.state,
          childProps = _state.childProps,
          className = _state.className,
          style = _state.style;

      if (childProps && Object.keys(childProps).length) {
        children = _react2.default.cloneElement(children, childProps);
      }
      return _react2.default.createElement(
        'div',
        {
          className: className,
          style: style,
          ref: function ref(e) {
            if (e) {
              _this3._element = e;
            }
          }
        },
        children
      );
    }
  }]);

  return ScrollingElement;
}(_react.Component);

ScrollingElement.defaultProps = {
  useInviewMonitor: function useInviewMonitor() {
    return true;
  },
  mountInitDelayTime: 0,
  // how much of the element should have be into view before it's considered
  // scrolled into view? default is 15%
  intoViewRatioShownThreshold: 0.15
};

exports.default = ScrollingElement;