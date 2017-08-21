'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CarouselButton = function CarouselButton(_ref) {
  var isNext = _ref.isNext,
      onClick = _ref.onClick;

  var classes = (0, _classnames2.default)({
    'carousel-button--next': !!isNext,
    'right-0': !!isNext,
    'left-0': !isNext
  }, 'absolute button button--plain carousel-button');
  var icon = isNext ? 'carousel-arrow-right' : 'carousel-arrow-left';
  return _react2.default.createElement(
    _Button2.default,
    { className: classes, onClick: onClick },
    _react2.default.createElement(_Icon2.default, { icon: icon })
  );
};

exports.default = CarouselButton;