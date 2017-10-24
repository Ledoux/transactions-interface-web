'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Section = function Section(_ref) {
  var beforeSection = _ref.beforeSection,
      children = _ref.children,
      extraClass = _ref.extraClass,
      isFullHeight = _ref.isFullHeight;

  return _react2.default.createElement(
    'section',
    { className: (0, _classnames2.default)('section', {
        'section--full-height': isFullHeight
      }, extraClass) },
    _react2.default.createElement(
      'div',
      { className: 'section__inner' },
      beforeSection && _react2.default.createElement(
        'div',
        { className: 'section__inner__between-sections' },
        beforeSection
      ),
      children
    )
  );
};

Section.propTypes = { beforeSection: _propTypes2.default.node,
  children: _propTypes2.default.node.isRequired,
  extraClass: _propTypes2.default.string
};

exports.default = Section;