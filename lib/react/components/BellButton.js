'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _transactionsReduxNormalizer = require('transactions-redux-normalizer');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require$default = require('transactions-interface-state').default,
    closeInformation = _require$default.closeInformation,
    showInformation = _require$default.showInformation;

var BellButton = function BellButton(_ref) {
  var closeInformation = _ref.closeInformation,
      isInformationActive = _ref.isInformationActive,
      isNewNotification = _ref.isNewNotification,
      onTopOfDarkSection = _ref.onTopOfDarkSection,
      showInformation = _ref.showInformation;

  var classes = (0, _classnames2.default)({
    'bell-button--active': isInformationActive,
    'bell-button--on-dark-bg': onTopOfDarkSection
  }, 'bell-button');
  return _react2.default.createElement(
    _Button2.default,
    {
      className: classes,
      onClick: function onClick(e) {
        e.preventDefault();
        if (!isInformationActive) {
          showInformation();
        } else {
          // For keyboard users.
          // Not used for mouseclicks, instead we capture clicks via dismiss overlay
          closeInformation();
        }
      }
    },
    _react2.default.createElement(_Icon2.default, {
      className: 'bell-button__icon',
      icon: 'bell'
    }),
    isNewNotification && _react2.default.createElement(
      'svg',
      { className: 'bell-button__alert' },
      _react2.default.createElement('circle', { className: 'bell-button__alert__circle' })
    )
  );
};

BellButton.propTypes = {
  closeInformation: _propTypes2.default.func.isRequired,
  isInformationActive: _propTypes2.default.bool.isRequired,
  onTopOfDarkSection: _propTypes2.default.bool,
  showInformation: _propTypes2.default.func.isRequired
};

var mapStateToProps = function mapStateToProps(state) {
  var isActive = state.information.isActive;

  var notifications = (0, _transactionsReduxNormalizer.getNormalizerEntities)(state, 'notifications');
  var isNewNotification = notifications.find(function (_ref2) {
    var isSeen = _ref2.isSeen;
    return !isSeen;
  });
  return {
    isInformationActive: isActive,
    isNewNotification: isNewNotification
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  closeInformation: closeInformation,
  showInformation: showInformation
})(BellButton);