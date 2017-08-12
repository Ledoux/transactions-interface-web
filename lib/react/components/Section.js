'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = function Section(_ref) {
  var beforeSection = _ref.beforeSection,
      children = _ref.children,
      extraClass = _ref.extraClass,
      first = _ref.first,
      quilt = _ref.quilt;

  var classes = (0, _classnames2.default)({
    'section--first': first,
    'section--quilt': quilt
  }, 'section', extraClass);
  return _react2.default.createElement(
    'section',
    { className: classes },
    _react2.default.createElement(
      'div',
      { className: 'page-section__inner' },
      beforeSection && _react2.default.createElement(
        'div',
        { className: 'page-section__between-sections' },
        beforeSection
      ),
      children
    )
  );
};

Section.propTypes = {
  beforeSection: _propTypes2.default.node,
  children: _propTypes2.default.node.isRequired,
  extraClass: _propTypes2.default.string,
  first: _propTypes2.default.bool,
  quilt: _propTypes2.default.bool
};

exports.default = Section;