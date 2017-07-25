'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxRequest = require('transactions-redux-request');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _Search = require('./Search');

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Explore = function (_Component) {
  _inherits(Explore, _Component);

  function Explore(props) {
    _classCallCheck(this, Explore);

    var _this = _possibleConstructorReturn(this, (Explore.__proto__ || Object.getPrototypeOf(Explore)).call(this));

    _this.state = {
      selectedIndexes: props.options && [0]
    };
    _this.handleRequestContent = _this._handleRequestContent.bind(_this);
    _this.onExploreChange = _this._onExploreChange.bind(_this);
    return _this;
  }

  _createClass(Explore, [{
    key: '_handleRequestContent',
    value: function _handleRequestContent() {
      var _props = this.props,
          dispatch = _props.dispatch,
          label = _props.label,
          options = _props.options,
          requestTransactions = _props.requestTransactions;
      // given the frontend options
      // we here adapt the options necessary for
      // the backend request

      var requestOptions = options
      //.filter(option => option.query)
      .map(function (_ref) {
        var collectionName = _ref.collectionName,
            query = _ref.query;

        return { collectionName: collectionName,
          query: query
        };
      });
      if (requestOptions.length > 0) {
        dispatch(requestTransactions('GET', requestOptions, { tag: label + '-explore' }));
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleRequestContent();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var options = this.props.options;
      // look for a state with one single collection

      if ((!prevProps.options || prevProps.options.length !== 1) && options && options.length === 1) {
        this.setState({ selectedIndexes: [0] });
      }
      // look for new backend request
      if (prevProps.options !== options) {
        // this.handleRequestContent()
      }
    }
  }, {
    key: '_onExploreChange',
    value: function _onExploreChange(state) {
      this.setState(state);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          getFilteredElements = _props2.getFilteredElements,
          getRequestQuery = _props2.getRequestQuery,
          inputTemplate = _props2.inputTemplate,
          interactions = _props2.interactions,
          isAdd = _props2.isAdd,
          isEdit = _props2.isEdit,
          isNew = _props2.isNew,
          isShrinked = _props2.isShrinked,
          isSmall = _props2.isSmall,
          label = _props2.label,
          options = _props2.options,
          placeholder = _props2.placeholder;
      var _state = this.state,
          explore = _state.explore,
          selectedIndexes = _state.selectedIndexes;

      var selectedOptions = selectedIndexes.map(function (selectedIndex) {
        return options[selectedIndex];
      });
      selectedOptions.sort(function (a, b) {
        return a.collectionName - b.collectionName;
      });
      var isSelection = options && options.length > 1;
      var isLists = selectedOptions.length > 0;
      return _react2.default.createElement(
        'div',
        { className: 'explore' },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('explore__search', {
              'explore__search--shrinked': isShrinked
            }) },
          _react2.default.createElement(_Search2.default, {
            exploreState: this.state,
            getRequestQuery: getRequestQuery,
            interactions: interactions,
            inputTemplate: inputTemplate,
            isAdd: true,
            label: label,
            onExploreChange: this.onExploreChange,
            options: selectedOptions,
            placeholder: placeholder
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'explore__collections flex flex-wrap' },
          isSelection && options.map(function (_ref2, index) {
            var collectionName = _ref2.collectionName;

            var isSelected = selectedIndexes.includes(index);
            return _react2.default.createElement(
              _Button2.default,
              {
                className: (0, _classnames2.default)('button button--alive explore__collections__child', {
                  'explore__collections__child--selected': isSelected
                }),
                key: index,
                onClick: function onClick() {
                  var newSelectedIndexes = isSelected ? selectedIndexes.filter(function (selectedIndex) {
                    return selectedIndex !== index;
                  }) : selectedIndexes.concat([index]);
                  _this2.setState({ selectedIndexes: newSelectedIndexes });
                }
              },
              collectionName
            );
          })
        ),
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('explore__lists', {
              'explore__lists--shrinked': isShrinked
            }) },
          isLists && selectedOptions.map(function (selectedOption, index) {
            return _react2.default.createElement(
              'div',
              {
                className: 'explore__lists__child',
                key: index
              },
              isSelection && _react2.default.createElement(
                'p',
                { className: 'explore__lists__child__title' },
                selectedOption.collectionName
              ),
              _react2.default.createElement(_List2.default, _extends({
                exploreState: _this2.state,
                getFilteredElements: getFilteredElements,
                isEdit: isEdit,
                isNew: isNew,
                isShrinked: isShrinked,
                isSmall: isSmall,
                label: label,
                onExploreChange: _this2.onExploreChange
              }, selectedOption))
            );
          })
        )
      );
    }
  }]);

  return Explore;
}(_react.Component);

Explore.defaultProps = {
  requestTransactions: _transactionsReduxRequest.requestTransactions
};

exports.default = (0, _reactRedux.connect)(null, function (dispatch) {
  return { dispatch: dispatch };
})(Explore);