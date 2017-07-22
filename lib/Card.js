'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _transactions = require('../reducers/transactions');

var _schemas = require('../schemas');

var _slug = require('../utils/slug');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require$default = require('../reducers/form').default,
    getFormEntity = _require$default.getFormEntity,
    getNewForm = _require$default.getNewForm,
    resetForm = _require$default.resetForm,
    setForm = _require$default.setForm;

var Card = function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    _classCallCheck(this, Card);

    var _this = _possibleConstructorReturn(this, (Card.__proto__ || Object.getPrototypeOf(Card)).call(this));

    _this.handleUpdateForm = _this._handleUpdateForm.bind(_this);
    _this.state = {
      hasRequestedOnce: false
    };
    return _this;
  }

  _createClass(Card, [{
    key: '_handleUpdateForm',
    value: function _handleUpdateForm() {
      var _props = this.props,
          collectionName = _props.collectionName,
          entity = _props.entity,
          entityName = _props.entityName,
          isNew = _props.isNew,
          newForm = _props.newForm,
          notStoredOptions = _props.notStoredOptions,
          requestTransactions = _props.requestTransactions,
          setForm = _props.setForm,
          search = _props.search,
          userId = _props.userId,
          userSlug = _props.userSlug;
      var hasRequestedOnce = this.state.hasRequestedOnce;
      // check if we are not in the new situation in where
      // we don't have yet filled the form with an empty entity

      if (isNew && !entity.id) {
        // check first if we already downloaded the joined entities
        if (!hasRequestedOnce && notStoredOptions && notStoredOptions.length > 0) {
          this.setState({ hasRequestedOnce: true });
          requestTransactions('GET', notStoredOptions, 'form');
        }
        // look if there is not already some properties in the search
        var collectionKey = collectionName + 'ById';
        var form = newForm || _defineProperty({}, collectionKey, { _NEW_: {} });
        // warning
        if (!form[collectionKey]) {
          console.warn('In the Card Component,\n          you need a form with ' + collectionKey);
          return;
        }
        var newEntity = form[collectionKey]._NEW_;
        if (!newEntity) {
          console.warn('In the Card Component,\n          you need a form with a new entity');
          return;
        }
        if (newEntity.encodedUrl) {
          newEntity.url = decodeURIComponent(newEntity.encodedUrl);
        }
        var newSlug = newEntity.slug;
        if (!newSlug) {
          var slug = _slug.getSlugByEntityName[entityName](Object.assign({}, entity, newEntity)) || (0, _shortid2.default)();
          console.log('slug', slug);
          console.warn('In the Card Component,\n          you need a new entity with a slug');
          return;
        }
        // give automatically the user id
        Object.assign(newEntity, {
          id: '_NEW_',
          slug: newSlug + '__USER__' + userSlug,
          userId: userId
        });
        // set
        setForm(form);
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleUpdateForm();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.handleUpdateForm();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.resetForm();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          ChildComponent = _props2.ChildComponent,
          getIsEmptyForm = _props2.getIsEmptyForm,
          entity = _props2.entity,
          entityName = _props2.entityName;

      return _react2.default.createElement(
        'div',
        { className: 'card' },
        _react2.default.createElement(ChildComponent, _extends({}, entity, {
          getIsEmptyForm: getIsEmptyForm
        }))
      );
    }
  }]);

  return Card;
}(_react.Component);

function mapStateToProps(state, ownProps) {
  var collectionName = ownProps.collectionName;
  var scrap = state.scrap,
      _state$user = state.user,
      id = _state$user.id,
      slug = _state$user.slug;

  var formEntity = getFormEntity(state, collectionName, '_NEW_');
  var newForm = getNewForm();
  var notStoredOptions = newForm && (0, _transactionsReduxNormalizer.getNotStoredOptions)(state, newForm, { appSchema: _schemas.appSchema });
  var entity = Object.assign({}, ownProps, scrap, formEntity);
  return { entity: entity,
    newForm: newForm,
    notStoredOptions: notStoredOptions,
    userId: id,
    userSlug: slug
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  requestTransactions: _transactions.requestTransactions,
  resetForm: resetForm,
  setForm: setForm
})(Card);