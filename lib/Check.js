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

var _CheckControls = require('./CheckControls');

var _CheckControls2 = _interopRequireDefault(_CheckControls);

var _Warning = require('./Warning');

var _Warning2 = _interopRequireDefault(_Warning);

var _Root = require('../containers/Root');

var _modal = require('../reducers/modal');

var _reselector = require('../reducers/reselector');

var _transactions = require('../reducers/transactions');

var _form = require('../utils/form');

var _navigation = require('../utils/navigation');

var _views = require('../utils/views');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getFormEntity = require('../reducers/form').default.getFormEntity;

var _require$default = require('../reducers/pipeline').default,
    assignPipeline = _require$default.assignPipeline,
    getPipelineEntities = _require$default.getPipelineEntities,
    getPipelineEntity = _require$default.getPipelineEntity;

var withoutControlsCollectionNames = ['articles', 'articleReviews', 'articleVerdicts', 'claims', 'claimReviews', 'links'];

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
      this.props.mergeReselector({
        WITH_SLUG: {
          slug: null
        }
      });
    }
  }, {
    key: '_handleNavigation',
    value: function _handleNavigation() {
      var _props = this.props,
          assignPipeline = _props.assignPipeline,
          closeModal = _props.closeModal,
          collectionName = _props.collectionName,
          entityName = _props.entityName,
          entities = _props.entities,
          entity = _props.entity,
          filterSlug = _props.filterSlug,
          isEdit = _props.isEdit,
          isNew = _props.isNew,
          isModalActive = _props.isModalActive,
          mergeReselector = _props.mergeReselector,
          newEntity = _props.newEntity,
          pipelineEntity = _props.pipelineEntity,
          requestTransactionsContent = _props.requestTransactionsContent,
          slug = _props.slug;
      var hasRequestedOnce = this.state.hasRequestedOnce;

      if (collectionName) {
        if (!slug) {
          // check first that we have data
          if (!entities && !hasRequestedOnce) {
            this.setState({ hasRequestedOnce: true });
            requestTransactionsContent('GET', [{ collectionName: collectionName }], collectionName + '-check');
            return;
          }
          var automaticSlug = (0, _navigation.getAutomaticSlug)(entities);
          if (automaticSlug) {
            _Root.history.push('/content/check/' + entityName + '/' + automaticSlug);
          }
        } else {
          // it is a content slug but we don't have yet the entity
          // because the filter slug is not set yet
          if (!isNew) {
            if (filterSlug !== slug) {
              mergeReselector({
                WITH_SLUG: {
                  slug: slug
                }
              });
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
                requestTransactionsContent('GET', [{ collectionName: collectionName, query: { slug: slug } }], collectionName);
              }
            }
          } else if (!pipelineEntity) {
            assignPipeline(_defineProperty({}, collectionName + 'ById', _defineProperty({}, entity.id, entity)));
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          collectionName = _props2.collectionName,
          entity = _props2.entity,
          entityName = _props2.entityName,
          isEdit = _props2.isEdit,
          isNotPipelinedYet = _props2.isNotPipelinedYet,
          pipelineEntity = _props2.pipelineEntity,
          slug = _props2.slug;

      var warningMessage = void 0;
      var isNew = slug === 'new';
      if (!isNew && !isNotPipelinedYet && !entity) {
        warningMessage = 'Warning, we did not find a good entity with the slug ' + slug;
      }
      var ContentComponent = entityName && _views.CardComponentsByEntityName[entityName];
      if (typeof ContentComponent === 'undefined') {
        warningMessage = 'Warning, we did not define yet a Card for the ' + entityName + ' entity';
      }
      var getIsEmptyForm = _form.getIsEmptyFormByEntityName[entityName];
      if (!getIsEmptyForm) {
        getIsEmptyForm = function getIsEmptyForm() {
          return false;
        };
      }
      return _react2.default.createElement(
        'main',
        { className: 'page check main' },
        _react2.default.createElement(
          'div',
          { className: 'check__control' },
          !withoutControlsCollectionNames.includes(collectionName) && _react2.default.createElement(_CheckControls2.default, {
            collectionName: collectionName,
            entity: entity,
            entityName: entityName,
            getIsEmptyForm: getIsEmptyForm,
            isEdit: isEdit,
            isNew: isNew,
            pipelineEntity: pipelineEntity
          })
        ),
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
      isNew = _ref2.isNew,
      slug = _ref2.slug;
  var isActive = state.modal.isActive,
      WITH_SLUG = state.reselector.WITH_SLUG;

  var slugEntities = collectionName && (0, _reselector.getFilteredElements)(state, 'WITH_SLUG', collectionName);
  var entity = collectionName && slugEntities && slugEntities.length === 1 && slugEntities[0];
  var pipelineEntity = entity && getPipelineEntity(state, collectionName, entity.id);
  var newEntity = collectionName && isNew && getFormEntity(state, collectionName, '_NEW_');
  var pipelineEntities = getPipelineEntities(state, collectionName);
  return {
    entities: pipelineEntities.length > 0 && pipelineEntities,
    entity: entity,
    filterSlug: WITH_SLUG.slug,
    isModalActive: isActive,
    newEntity: newEntity,
    pipelineEntity: pipelineEntity
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  assignPipeline: assignPipeline,
  closeModal: _modal.closeModal,
  mergeReselector: _transactionsReduxReselector.mergeReselector,
  requestTransactionsContent: _transactions.requestTransactionsContent
})(Check);