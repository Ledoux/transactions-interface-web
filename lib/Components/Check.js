'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxReselector = require('transactions-redux-reselector');

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _Warning = require('./Warning');

var _Warning2 = _interopRequireDefault(_Warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require$default = require('transactions-interface-state').default,
    assignPipeline = _require$default.assignPipeline,
    getAutomaticSlug = _require$default.getAutomaticSlug,
    getFormEntity = _require$default.getFormEntity,
    getPipelineEntities = _require$default.getPipelineEntities,
    getPipelineEntity = _require$default.getPipelineEntity,
    closeModal = _require$default.closeModal;

var getDefaultIsEmptyForm = function getDefaultIsEmptyForm() {
  return false;
};

// this is where one entity edition/post can be done

var Check = function (_Component) {
  _inherits(Check, _Component);

  function Check() {
    _classCallCheck(this, Check);

    var _this = _possibleConstructorReturn(this, (Check.__proto__ || Object.getPrototypeOf(Check)).call(this));

    _this.state = { hasRequestedOnce: false };
    _this.handleNavigation = _this._handleNavigation.bind(_this);
    return _this;
  }

  _createClass(Check, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleNavigation();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.handleNavigation();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.dispatch((0, _transactionsReduxReselector.mergeReselector)({
        WITH_SLUG: {
          slug: null
        }
      }));
    }
  }, {
    key: '_handleNavigation',
    value: function _handleNavigation() {
      var _props = this.props,
          collectionName = _props.collectionName,
          dispatch = _props.dispatch,
          entityName = _props.entityName,
          entities = _props.entities,
          entity = _props.entity,
          filterSlug = _props.filterSlug,
          history = _props.history,
          isEdit = _props.isEdit,
          isNew = _props.isNew,
          isModalActive = _props.isModalActive,
          newEntity = _props.newEntity,
          pipelineEntity = _props.pipelineEntity,
          requestTransactions = _props.requestTransactions,
          slug = _props.slug;
      var hasRequestedOnce = this.state.hasRequestedOnce;

      if (collectionName) {
        if (!slug) {
          // check first that we have data
          if (!entities && !hasRequestedOnce) {
            this.setState({ hasRequestedOnce: true });
            dispatch(requestTransactions('GET', [{ collectionName: collectionName }], collectionName + '-check'));
            return;
          }
          var automaticSlug = getAutomaticSlug(entities);
          if (automaticSlug) {
            history.push('/content/check/' + entityName + '/' + automaticSlug);
          }
        } else {
          // it is a content slug but we don't have yet the entity
          // because the filter slug is not set yet
          if (!isNew) {
            if (filterSlug !== slug) {
              dispatch((0, _transactionsReduxReselector.mergeReselector)({
                WITH_SLUG: {
                  slug: slug
                }
              }));
              return;
            }
          }
          // now make sure that we will have the entity (if it exists)
          if (!entity) {
            if (!hasRequestedOnce) {
              // either this is not the new mode,
              // so we have actually the slug and we can peacefully
              // get the matching already stored entity
              // Or actually we don't have the slug, buu actually
              // this new entity has some joined entities needed
              // and that are sotred in the new form object
              if (!isNew || newEntity) {
                this.setState({ hasRequestedOnce: true });
                dispatch(requestTransactions('GET', [{ collectionName: collectionName, query: { slug: slug } }], collectionName));
              }
            }
          } else if (!pipelineEntity) {
            dispatch(assignPipeline(_defineProperty({}, collectionName + 'ById', _defineProperty({}, entity.id, entity))));
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          collectionName = _props2.collectionName,
          ContentComponent = _props2.ContentComponent,
          entity = _props2.entity,
          entityName = _props2.entityName,
          getIsEmptyForm = _props2.getIsEmptyForm,
          isControl = _props2.isControl,
          isEdit = _props2.isEdit,
          isNotPipelinedYet = _props2.isNotPipelinedYet,
          pipelineEntity = _props2.pipelineEntity,
          slug = _props2.slug;

      var warningMessage = void 0;
      var isNew = slug === 'new';
      if (!isNew && !isNotPipelinedYet && !entity) {
        warningMessage = 'Warning, we did not find a good entity with the slug ' + slug;
      }
      if (typeof ContentComponent === 'undefined') {
        warningMessage = 'Warning, we did not define yet a Card for the ' + entityName + ' entity';
      }
      return _react2.default.createElement(
        'main',
        { className: 'page check main' },
        _react2.default.createElement(
          'div',
          { className: 'check__content' },
          !warningMessage && ContentComponent && _react2.default.createElement(_Card2.default, _extends({
            ChildComponent: ContentComponent
          }, entity, {
            collectionName: collectionName,
            entityName: entityName,
            getIsEmptyForm: getIsEmptyForm,
            isEdit: isEdit,
            isNew: isNew,
            isTitle: true
          })),
          warningMessage && _react2.default.createElement(_Warning2.default, { text: warningMessage })
        )
      );
    }
  }]);

  return Check;
}(_react.Component);

function mapStateToProps(state, _ref2) {
  var collectionName = _ref2.collectionName,
      entityName = _ref2.entityName,
      getFilteredElements = _ref2.getFilteredElements,
      isNew = _ref2.isNew,
      slug = _ref2.slug;
  var cardViewer = state.cardViewer,
      formalizer = state.formalizer,
      isActive = state.modal.isActive,
      WITH_SLUG = state.reselector.WITH_SLUG;

  var ContentComponent = entityName && cardViewer[entityName];
  var getIsEmptyForm = entityName && formalizer[entityName] || getDefaultIsEmptyForm;
  var slugEntities = collectionName && getFilteredElements(state, 'WITH_SLUG', collectionName);
  var entity = collectionName && slugEntities && slugEntities.length === 1 && slugEntities[0];
  var pipelineEntity = entity && getPipelineEntity(state, collectionName, entity.id);
  var newEntity = collectionName && isNew && getFormEntity(state, collectionName, '_NEW_');
  var pipelineEntities = getPipelineEntities(state, collectionName);
  return { ContentComponent: ContentComponent,
    entities: pipelineEntities.length > 0 && pipelineEntities,
    entity: entity,
    filterSlug: WITH_SLUG.slug,
    getIsEmptyForm: getIsEmptyForm,
    isModalActive: isActive,
    newEntity: newEntity,
    pipelineEntity: pipelineEntity
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(Check);