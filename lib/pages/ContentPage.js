'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pluralize = require('pluralize');

var _pluralize2 = _interopRequireDefault(_pluralize);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Check = require('../components/Check');

var _Check2 = _interopRequireDefault(_Check);

var _Explore = require('../components/Explore');

var _Explore2 = _interopRequireDefault(_Explore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require$default = require('transactions-interface-state').default,
    closeModal = _require$default.closeModal,
    getAutomaticCollectionName = _require$default.getAutomaticCollectionName,
    setAuthorizationSelectedMode = _require$default.setAuthorizationSelectedMode,
    showModal = _require$default.showModal;

var TaskComponentsByName = {
  Check: _Check2.default,
  Explore: _Explore2.default
};

var ContentPage = function (_Component) {
  _inherits(ContentPage, _Component);

  function ContentPage() {
    _classCallCheck(this, ContentPage);

    var _this = _possibleConstructorReturn(this, (ContentPage.__proto__ || Object.getPrototypeOf(ContentPage)).call(this));

    _this.handleNavigation = _this._handleNavigation.bind(_this);
    return _this;
  }

  _createClass(ContentPage, [{
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
    key: '_handleNavigation',
    value: function _handleNavigation() {
      var _props = this.props,
          availableCollectionNames = _props.availableCollectionNames,
          availableSingularOrPluralNames = _props.availableSingularOrPluralNames,
          dispatch = _props.dispatch,
          entityName = _props.entityName,
          history = _props.history,
          isModalActive = _props.isModalActive,
          modes = _props.modes,
          modeName = _props.modeName,
          modeNamesBySingularOrPluralName = _props.modeNamesBySingularOrPluralName,
          singularOrPluralName = _props.singularOrPluralName,
          showModalModesList = _props.showModalModesList,
          taskName = _props.taskName;
      // first it is not necessary to contine if we don't have modes or if we are not
      // in a content page

      if (!taskName || !modes) {
        return;
      }
      // if we have modes then go for determining content
      if (!singularOrPluralName) {
        if (!modeName) {
          if (modes && modes.length > 0) {
            dispatch(showModalModesList ? showModalModesList() : showModal('You need to choose a mode'));
          } else {
            console.log('WE DON t have yet some modes');
            return;
          }
        } else {
          // for now pick it randomly
          var automaticCollectionName = getAutomaticCollectionName(availableCollectionNames);
          if (automaticCollectionName) {
            var _singularOrPluralName = taskName === 'check' ? (0, _pluralize2.default)(automaticCollectionName, 1) : automaticCollectionName;
            history.push('/content/' + taskName + '/' + _singularOrPluralName);
          }
        }
      } else {
        // check that maybe we changed the mode so the singularOrPluralName is deprecated
        if (availableSingularOrPluralNames && !availableSingularOrPluralNames.includes(singularOrPluralName)) {
          history.push('/content/' + taskName);
          return;
        }
        // and let's find automatically what it is
        var matchingModeName = modeNamesBySingularOrPluralName[singularOrPluralName];
        if (matchingModeName) {
          var suggestedMode = modes.find(function (mode) {
            return mode.name === matchingModeName;
          });
          // only set a new authorization if we have a good suggested mode
          // and that actually we are not already in that mode
          if (suggestedMode && modeName !== suggestedMode.name) {
            dispatch(setAuthorizationSelectedMode(suggestedMode));
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          getFilteredElements = _props2.getFilteredElements,
          isEdit = _props2.isEdit,
          modeName = _props2.modeName,
          requestTransactions = _props2.requestTransactions,
          singularOrPluralName = _props2.singularOrPluralName,
          slug = _props2.slug,
          taskName = _props2.taskName;

      var componentName = taskName && '' + taskName[0].toUpperCase() + taskName.slice(1) || 'Explore';
      var TaskComponent = TaskComponentsByName[componentName];
      var collectionName = void 0;
      var entityName = void 0;
      if (singularOrPluralName) {
        if (taskName === 'check') {
          collectionName = (0, _pluralize2.default)(singularOrPluralName, 2);
          entityName = singularOrPluralName;
        } else {
          collectionName = singularOrPluralName;
          entityName = (0, _pluralize2.default)(singularOrPluralName, 1);
        }
      }
      var isNew = slug === 'new';
      var label = 'content-' + collectionName;
      var options = [{
        collectionName: collectionName,
        entityName: entityName,
        label: label
      }];
      return _react2.default.createElement(
        'div',
        { className: 'content-page' },
        _react2.default.createElement(TaskComponent, {
          collectionName: collectionName,
          entityName: entityName,
          getFilteredElements: getFilteredElements,
          label: label,
          isEdit: isEdit,
          isNew: isNew,
          modeName: modeName,
          requestTransactions: requestTransactions,
          slug: slug,
          options: options
        })
      );
    }
  }]);

  return ContentPage;
}(_react.Component);

function mapStateToProps(_ref) {
  var _ref$authorization = _ref.authorization,
      mode = _ref$authorization.mode,
      modeNamesBySingularOrPluralName = _ref$authorization.modeNamesBySingularOrPluralName,
      modes = _ref$authorization.modes,
      isActive = _ref.modal.isActive;

  return {
    availableCollectionNames: mode && mode.availableCollectionNames,
    availableSingularOrPluralNames: mode && mode.availableSingularOrPluralNames,
    isModalActive: isActive,
    modeName: mode && mode.name,
    modeNamesBySingularOrPluralName: modeNamesBySingularOrPluralName,
    modes: modes
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(ContentPage);