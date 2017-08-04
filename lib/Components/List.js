'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

var _Item = require('./Item');

var _Item2 = _interopRequireDefault(_Item);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

var _Warning = require('./Warning');

var _Warning2 = _interopRequireDefault(_Warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getTransactionsProps = require('transactions-interface-state').default.getTransactionsProps;

var List = function List(props) {
  var collectionName = props.collectionName,
      ContentComponent = props.ContentComponent,
      entities = props.entities,
      entityName = props.entityName,
      exploreState = props.exploreState,
      BottomInteractionComponent = props.BottomInteractionComponent,
      inputTemplate = props.inputTemplate,
      interactionExtra = props.interactionExtra,
      isSearch = props.isSearch,
      isShrinked = props.isShrinked,
      isSmall = props.isSmall,
      label = props.label,
      LeftInteractionComponent = props.LeftInteractionComponent,
      maxDisplayCount = props.maxDisplayCount,
      onExploreChange = props.onExploreChange,
      placeholder = props.placeholder,
      RightInteractionComponent = props.RightInteractionComponent;

  var warningMessage = void 0;
  var entitiesLength = entities && entities.length;
  if (collectionName && entitiesLength > 0) {
    if (typeof ContentComponent === 'undefined') {
      warningMessage = 'Warning, there is no a defined Item Component for ' + collectionName;
    }
  } else {
    warningMessage = 'No ' + collectionName + ' found';
  }
  var displayedLength = Math.min(maxDisplayCount, entitiesLength);
  var isNotTotal = maxDisplayCount && entitiesLength > maxDisplayCount;
  var isMore = maxDisplayCount && isNotTotal;
  var transactionsProps = getTransactionsProps(props);
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)('list', {
        'list--shrinked': isShrinked
      }) },
    ContentComponent && entities && entities.slice(0, displayedLength).map(function (entity, index) {
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)('list__child', {
            'list__child--shrinked': isShrinked,
            'list__child--small': isSmall
          }),
          key: index },
        _react2.default.createElement(_Item2.default, _extends({
          ContentComponent: ContentComponent,
          BottomInteractionComponent: BottomInteractionComponent,
          exploreState: exploreState,
          interactionExtra: interactionExtra,
          isLast: index === displayedLength - 1,
          isShrinked: isShrinked,
          isSmall: isSmall,
          entity: entity,
          entityName: entityName,
          LeftInteractionComponent: LeftInteractionComponent,
          onExploreChange: onExploreChange,
          RightInteractionComponent: RightInteractionComponent
        }, transactionsProps))
      );
    }),
    warningMessage && _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('list__child', {
          'list__child--shrinked': isShrinked,
          'list__child--shrinked--last': true,
          'list__child--small': isSmall
        }),
        key: 'more-item' },
      _react2.default.createElement(_Item2.default, {
        collectionName: collectionName,
        exploreState: exploreState,
        isLast: true,
        isShrinked: isShrinked,
        isSmall: true,
        onExploreChange: onExploreChange,
        text: warningMessage
      })
    ),
    ContentComponent && isMore && _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)('list__child', {
          'list__child--shrinked': isShrinked,
          'list__child--shrinked--last': true,
          'list__child--small': isSmall
        }),
        key: 'more-item' },
      _react2.default.createElement(_Item2.default, {
        collectionName: collectionName,
        exploreState: exploreState,
        isLast: true,
        isShrinked: isShrinked,
        isSmall: true,
        onExploreChange: onExploreChange,
        text: 'Precise your search if you want to find other matching ' + collectionName
      })
    )
  );
};

List.defaultProps = {
  ItemComponentsByCollectionName: {},
  label: 'default'

  // we get the entities from the pipelined entities
  // stored in the location reducer
};function mapStateToProps(state, _ref) {
  var collectionName = _ref.collectionName,
      getFilteredElements = _ref.getFilteredElements,
      label = _ref.label;
  var itemViewer = state.itemViewer,
      _state$reselector$WIT = state.reselector.WITH_SIGN_SEARCH,
      query = _state$reselector$WIT.query,
      sign = _state$reselector$WIT.sign;
  // no need to go further if no collectionName

  if (!collectionName) {
    return {};
  }
  var ContentComponent = itemViewer[collectionName];
  // let s see if we need to restrict because of a search filter
  var entities = getFilteredElements(state, query && sign === label ? 'WITH_SIGN_SEARCH' : 'ALL', collectionName, { isRecursive: true });
  // return
  return { ContentComponent: ContentComponent,
    entities: entities
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(List);