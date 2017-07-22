'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reselector = require('../reducers/reselector');

var _views = require('../utils/views');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var List = function List(_ref) {
  var collectionName = _ref.collectionName,
      entities = _ref.entities,
      entityName = _ref.entityName,
      exploreState = _ref.exploreState,
      BottomInteractionComponent = _ref.BottomInteractionComponent,
      inputTemplate = _ref.inputTemplate,
      interactionExtra = _ref.interactionExtra,
      isSearch = _ref.isSearch,
      isShrinked = _ref.isShrinked,
      isSmall = _ref.isSmall,
      label = _ref.label,
      LeftInteractionComponent = _ref.LeftInteractionComponent,
      maxDisplayCount = _ref.maxDisplayCount,
      onExploreChange = _ref.onExploreChange,
      placeholder = _ref.placeholder,
      RightInteractionComponent = _ref.RightInteractionComponent;

  var ContentComponent = void 0;
  var warningMessage = void 0;
  var entitiesLength = entities && entities.length;
  if (collectionName && entitiesLength > 0) {
    ContentComponent = _views.ItemComponentsByCollectionName[collectionName];
    if (typeof ContentComponent === 'undefined') {
      warningMessage = 'Warning, we did not define yet an Item Component for ' + collectionName;
    }
  } else {
    warningMessage = 'No ' + collectionName + ' found';
  }
  var displayedLength = Math.min(maxDisplayCount, entitiesLength);
  var isNotTotal = maxDisplayCount && entitiesLength > maxDisplayCount;
  var isMore = maxDisplayCount && isNotTotal;
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
        _react2.default.createElement(_Item2.default, {
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
        })
      );
    }),
    isMore && _react2.default.createElement(
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
    ),
    warningMessage && _react2.default.createElement(_Warning2.default, { text: warningMessage })
  );
};

List.defaultProps = {
  label: 'default'

  // we get the entities from the pipelined entities
  // stored in the location reducer
};function mapStateToProps(state, _ref2) {
  var collectionName = _ref2.collectionName,
      label = _ref2.label;
  var _state$reselector$WIT = state.reselector.WITH_SIGN_SEARCH,
      query = _state$reselector$WIT.query,
      sign = _state$reselector$WIT.sign;
  // no need to go further if no collectionName

  if (!collectionName) {
    return {};
  }
  // let s see if we need to restrict because of a search filter
  var entities = (0, _reselector.getFilteredElements)(state, query && sign === label ? 'WITH_SIGN_SEARCH' : 'ALL', collectionName, { isRecursive: true });
  return { entities: entities };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(List);