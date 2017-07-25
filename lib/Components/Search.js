'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxReselector = require('transactions-redux-reselector');

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AND_SEPARATOR = ' ';
var SEPARATOR = ':';

var Search = function (_Component) {
  _inherits(Search, _Component);

  function Search() {
    _classCallCheck(this, Search);

    var _this = _possibleConstructorReturn(this, (Search.__proto__ || Object.getPrototypeOf(Search)).call(this));

    _this.state = {};
    _this.handleAddContent = _this._handleAddContent.bind(_this);
    _this.handleRequestContent = _this._handleRequestContent.bind(_this);
    _this.onChangeValue = _this._onChangeValue.bind(_this);
    _this.onKeyPress = _this._onKeyPress.bind(_this);
    return _this;
  }

  _createClass(Search, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          assignReselectorFilter = _props.assignReselectorFilter,
          label = _props.label;

      assignReselectorFilter('WITH_SIGN_SEARCH', {
        sign: label
      });
    }
  }, {
    key: '_handleAddContent',
    value: function _handleAddContent() {
      var _props2 = this.props,
          history = _props2.history,
          options = _props2.options;

      var addOption = options && options[0];
      // we can add content only if we are in the one option case
      if (addOption) {
        var collectionName = addOption.collectionName,
            entityName = addOption.entityName;

        var form = _defineProperty({}, collectionName + 'ById', {
          _NEW_: {}
        });
        history.push('/content/check/' + entityName + '/new?form=' + encodeURI(JSON.stringify(form)));
      }
    }
  }, {
    key: '_handleRequestContent',
    value: function _handleRequestContent() {
      var _props3 = this.props,
          getRequestQuery = _props3.getRequestQuery,
          observedCollectionName = _props3.observedCollectionName,
          options = _props3.options,
          query = _props3.query,
          requestTransactions = _props3.requestTransactions;

      var requestQuery = getRequestQuery && getRequestQuery(query) || query;
      requestTransactions('GET', options.map(function (_ref) {
        var collectionName = _ref.collectionName;

        return { collectionName: collectionName,
          query: requestQuery
        };
      }));
    }
  }, {
    key: '_onChangeValue',
    value: function _onChangeValue(event) {
      var _props4 = this.props,
          assignReselectorFilter = _props4.assignReselectorFilter,
          inputTemplate = _props4.inputTemplate,
          label = _props4.label;
      // get from the target

      var value = event.target.value || '';
      var query = null;
      // maybe the search has already an inputTemplate in which we inject the
      // input value
      if (inputTemplate && value.length > 0) {
        query = {};
        value.split(AND_SEPARATOR).forEach(function (andValue, index) {
          var replacedExpression = inputTemplate.replace(/\{\{value\}\}/g, andValue);
          var chunks = replacedExpression.split(SEPARATOR);
          query[index + '_' + chunks[0]] = chunks.slice(1).join(SEPARATOR);
        });
        assignReselectorFilter('WITH_SIGN_SEARCH', {
          query: query,
          sign: label
        });
        return;
      }
      assignReselectorFilter('WITH_SIGN_SEARCH', {
        query: query
      });
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.assignReselectorFilter('WITH_SIGN_SEARCH', {
        query: null,
        sign: null
      });
    }
  }, {
    key: '_onKeyPress',
    value: function _onKeyPress(event) {
      if (event.charCode === 13) {
        event.preventDefault(); // Ensure it is only this code that runs
        this.handleRequestContent();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var handleAddContent = this.handleAddContent,
          handleRequestContent = this.handleRequestContent,
          onChangeValue = this.onChangeValue,
          onKeyPress = this.onKeyPress;
      var _props5 = this.props,
          className = _props5.className,
          exploreState = _props5.exploreState,
          interactions = _props5.interactions,
          isAdd = _props5.isAdd,
          isSmall = _props5.isSmall,
          onExploreChange = _props5.onExploreChange,
          options = _props5.options,
          placeholder = _props5.placeholder;

      return _react2.default.createElement(
        'div',
        { className: className || 'search flex' },
        interactions && interactions.map(function (_ref2, index) {
          var getClassName = _ref2.getClassName,
              icon = _ref2.icon,
              _onClick = _ref2.onClick;
          return _react2.default.createElement(_IconButton2.default, {
            className: getClassName && getClassName(exploreState) || (0, _classnames2.default)('button icon-button button--alive search__button', {
              'search__button--small': isSmall
            }),
            key: index,
            icon: icon,
            onClick: function onClick(event) {
              return _onClick(event, exploreState);
            }
          });
        }),
        isAdd && _react2.default.createElement(_IconButton2.default, {
          className: (0, _classnames2.default)('button icon-button button--alive search__button', {
            'search__button--small': isSmall
          }),
          icon: 'plus',
          onClick: handleAddContent
        }),
        _react2.default.createElement(_IconButton2.default, {
          className: (0, _classnames2.default)('button icon-button button--alive search__button', {
            'search__button--small': isSmall
          }),
          icon: 'magnifying_glass',
          onClick: handleRequestContent
        }),
        _react2.default.createElement('input', {
          className: (0, _classnames2.default)('search__input flex-auto', {
            'search__input--small': isSmall,
            'search__input--add': isAdd
          }),
          type: 'text',
          placeholder: placeholder,
          onChange: onChangeValue,
          onKeyPress: onKeyPress
        })
      );
    }
  }]);

  return Search;
}(_react.Component);

Search.defaultProps = {
  colNumber: 1,
  label: 'default',
  placeholder: 'type here for searching what you want'
};

function mapStateToProps(_ref3, _ref4) {
  var _ref3$reselector$WITH = _ref3.reselector.WITH_SIGN_SEARCH,
      query = _ref3$reselector$WITH.query,
      sign = _ref3$reselector$WITH.sign;
  var label = _ref4.label;

  return sign === label ? { query: query } : {};
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, { assignReselectorFilter: _transactionsReduxReselector.assignReselectorFilter })(Search);