'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactRedux = require('react-redux');

var _transactionsInterfaceState = require('transactions-interface-state');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigation = function Navigation(_ref) {
  var activePathname = _ref.activePathname,
      closeNavigation = _ref.closeNavigation,
      closeModal = _ref.closeModal,
      email = _ref.email,
      isActive = _ref.isActive,
      LogoutLinkComponent = _ref.LogoutLinkComponent,
      visibleLinks = _ref.visibleLinks,
      showModal = _ref.showModal;

  var classes = (0, _classnames2.default)({
    'navigation--showing': isActive
  }, 'navigation');
  return _react2.default.createElement(
    'div',
    { className: classes, onClick: closeNavigation },
    _react2.default.createElement(
      'nav',
      { className: 'navigation__list px2 py1', onClick: function onClick(e) {
          e.nativeEvent.stopImmediatePropagation(); // Prevent click bubbling and closing modal
          e.stopPropagation();
        } },
      visibleLinks.map(function (_ref2, idx) {
        var external = _ref2.external,
            label = _ref2.label,
            target = _ref2.target,
            path = _ref2.path;

        return _react2.default.createElement(
          'div',
          {
            className: 'navigation__list__item',
            key: idx
          },
          _react2.default.createElement(
            _Link2.default,
            {
              className: (0, _classnames2.default)({
                'navigation__list__item__link--active': path === window.location.pathname
              }, 'block py2 navigation__list__item__link'),
              external: external,
              href: path,
              target: target
            },
            label
          )
        );
      }),
      email && LogoutLinkComponent && _react2.default.createElement(
        'div',
        {
          className: 'navigation__list__item-container',
          key: visibleLinks.length + 1
        },
        _react2.default.createElement(LogoutLinkComponent, {
          afterShowModal: closeNavigation,
          className: 'logout-link navigation__list__item__link'
        })
      )
    )
  );
};

Navigation.propTypes = {
  closeNavigation: _propTypes2.default.func.isRequired,
  activePathname: _propTypes2.default.string
};

var mapStateToProps = function mapStateToProps(_ref3) {
  var links = _ref3.authorization.links,
      isActive = _ref3.navigation.isActive,
      email = _ref3.user.email;

  return {
    email: email,
    isActive: isActive,
    visibleLinks: links && links.filter(function (link) {
      return link.label;
    }) || []
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  closeNavigation: _transactionsInterfaceState.closeNavigation
})(Navigation);