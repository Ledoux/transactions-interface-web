'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Item = function Item(_ref) {
  var BottomInteractionComponent = _ref.BottomInteractionComponent,
      className = _ref.className,
      collectionName = _ref.collectionName,
      ContentComponent = _ref.ContentComponent,
      exploreState = _ref.exploreState,
      interactionExtra = _ref.interactionExtra,
      isLast = _ref.isLast,
      isShrinked = _ref.isShrinked,
      isSmall = _ref.isSmall,
      entity = _ref.entity,
      entityName = _ref.entityName,
      LeftInteractionComponent = _ref.LeftInteractionComponent,
      onExploreChange = _ref.onExploreChange,
      RightInteractionComponent = _ref.RightInteractionComponent,
      text = _ref.text;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(className || 'item', {
        'item--shrinked': isShrinked,
        'item--shrinked--last': isShrinked && isLast,
        'item--small': isSmall
      }) },
    LeftInteractionComponent && _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('item__left-interaction col', {
          'item__left-interaction--shrinked': isShrinked
        }) },
      _react2.default.createElement(LeftInteractionComponent, _extends({
        entityName: entityName,
        exploreState: exploreState,
        onExploreChange: onExploreChange
      }, entity, interactionExtra))
    ),
    _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('item__content', {
          'col': LeftInteractionComponent,
          'item__content--text flex items-center': text }) },
      ContentComponent && _react2.default.createElement(ContentComponent, _extends({
        collectionName: collectionName
      }, entity)),
      text && _react2.default.createElement(
        'p',
        { className: 'item__content__text' },
        text
      )
    ),
    RightInteractionComponent && _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('item__right-interaction ', {
          'item__right-interaction--shrinked': isShrinked
        }) },
      _react2.default.createElement(RightInteractionComponent, _extends({
        entityName: entityName,
        exploreState: exploreState,
        onExploreChange: onExploreChange
      }, entity, interactionExtra))
    ),
    BottomInteractionComponent && _react2.default.createElement(
      'div',
      {
        className: 'item__bottom-interaction' },
      _react2.default.createElement(BottomInteractionComponent, _extends({
        entityName: entityName,
        exploreState: exploreState,
        onExploreChange: onExploreChange
      }, entity, interactionExtra))
    )
  );
};

exports.default = Item;