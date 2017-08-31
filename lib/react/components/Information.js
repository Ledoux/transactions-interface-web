'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

var _transactionsInterfaceState = require('transactions-interface-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Information = function (_Component) {
  _inherits(Information, _Component);

  function Information() {
    _classCallCheck(this, Information);

    var _this = _possibleConstructorReturn(this, (Information.__proto__ || Object.getPrototypeOf(Information)).call(this));

    _this.state = { hasRequestedOnce: false };
    return _this;
  }

  _createClass(Information, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          requestTransactions = _props.requestTransactions,
          userId = _props.userId;
      var hasRequestedOnce = this.state.hasRequestedOnce;

      if (userId && !hasRequestedOnce) {
        this.setState({ hasRequestedOnce: true });
        requestTransactions('GET', [{
          collectionName: 'notifications',
          query: { userId: userId }
        }], { tag: 'notifications' });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props,
          isActive = _props2.isActive,
          isMockUser = _props2.isMockUser,
          requestTransactions = _props2.requestTransactions,
          notSeenNotifications = _props2.notSeenNotifications,
          userId = _props2.userId;
      // when we close the information menu
      // we can set to seen the previous unseen notifications

      if (prevProps.isActive && !isActive) {
        if (isMockUser) {
          var entities = notSeenNotifications.map(function (notSeenNotification) {
            return {
              id: notSeenNotification.id,
              isSeen: true
            };
          });
          (0, _transactionsReduxNormalizer.mergeNormalizerEntities)('notifications', entities);
        } else {
          requestTransactions('PUT', [{
            collectionName: 'notifications',
            query: {
              isSeen: false,
              userId: userId
            },
            update: { isSeen: true }
          }], { tag: 'notifications' });
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          activePathname = _props3.activePathname,
          closeInformation = _props3.closeInformation,
          isActive = _props3.isActive,
          notifications = _props3.notifications,
          showModal = _props3.showModal;

      var classes = (0, _classnames2.default)({
        'information--showing': isActive
      }, 'information');
      return _react2.default.createElement(
        'div',
        { className: classes, onClick: function onClick() {
            return closeInformation();
          } },
        _react2.default.createElement(
          'nav',
          { className: 'information__list',
            onClick: function onClick(e) {
              e.nativeEvent.stopImmediatePropagation(); // Prevent click bubbling and closing modal
              e.stopPropagation();
            } },
          notifications && notifications.sort(function (firstNotification, secondNotification) {
            return secondNotification.date - firstNotification.date;
          }).map(function (_ref, index) {
            var date = _ref.date,
                isSeen = _ref.isSeen,
                rawHTML = _ref.rawHTML,
                text = _ref.text;

            var notificationDate = new Date();
            date && notificationDate.setMilliseconds(date);
            var notificationDateString = notificationDate && notificationDate.toDateString().split(' ').slice(0, -1).join(' ');
            return _react2.default.createElement(
              'div',
              {
                className: (0, _classnames2.default)('information__list__item', {
                  'information__list__item--seen': isSeen
                }),
                key: index
              },
              text && _react2.default.createElement(
                'p',
                { className: 'information__list__item__text' },
                text
              ),
              rawHTML && _react2.default.createElement('div', {
                className: 'information__list__item__html',
                dangerouslySetInnerHTML: { __html: rawHTML }
              }),
              _react2.default.createElement(
                'p',
                { className: 'information__list__item__date' },
                notificationDateString
              )
            );
          })
        )
      );
    }
  }]);

  return Information;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, _ref2) {
  var getFilteredElements = _ref2.getFilteredElements;
  var isActive = state.information.isActive,
      _state$user = state.user,
      id = _state$user.id,
      isMock = _state$user.isMock;

  var notifications = (0, _transactionsReduxNormalizer.getNormalizerEntities)(state, 'notifications');
  var notSeenNotifications = getFilteredElements(state, 'WITH_NOT_IS_SEEN', 'notifications');
  return {
    isActive: isActive,
    isMockUser: isMock,
    notifications: notifications,
    notSeenNotifications: notSeenNotifications,
    userId: id
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, { closeInformation: _transactionsInterfaceState.closeInformation,
  mergeNormalizerEntities: _transactionsReduxNormalizer.mergeNormalizerEntities
})(Information);