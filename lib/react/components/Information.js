'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Information = function Information(_ref) {
  var activePathname = _ref.activePathname,
      closeInformation = _ref.closeInformation,
      isActive = _ref.isActive,
      notifications = _ref.notifications,
      showModal = _ref.showModal;

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
      }).map(function (_ref2, index) {
        var date = _ref2.date,
            isSeen = _ref2.isSeen,
            rawHTML = _ref2.rawHTML,
            text = _ref2.text;

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
};

exports.default = (0, _transactionsInterfaceState.Information)(Information);