'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _transactionsInterfaceState = require('transactions-interface-state');

var _transactionsUserWeb = require('transactions-user-web');

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _BellButton = require('./BellButton');

var _BellButton2 = _interopRequireDefault(_BellButton);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _EmblemLink = require('./EmblemLink');

var _EmblemLink2 = _interopRequireDefault(_EmblemLink);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _HamburgerButton = require('./HamburgerButton');

var _HamburgerButton2 = _interopRequireDefault(_HamburgerButton);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Navigation = require('./Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Header = function Header(_ref) {
  var active = _ref.active,
      children = _ref.children,
      firstName = _ref.firstName,
      id = _ref.id,
      imageUrl = _ref.imageUrl,
      isSign = _ref.isSign,
      isSigninPage = _ref.isSigninPage,
      LogoutLinkComponent = _ref.LogoutLinkComponent,
      menuLinks = _ref.menuLinks,
      pageName = _ref.pageName,
      pathname = _ref.pathname,
      visibleLinks = _ref.visibleLinks;

  return _react2.default.createElement(
    'div',
    { className: 'header header--' + pageName + ' flex justify-start items-center' },
    _react2.default.createElement(_Navigation2.default, { LogoutLinkComponent: LogoutLinkComponent,
      visibleLinks: visibleLinks }),
    _react2.default.createElement(_EmblemLink2.default, null),
    _react2.default.createElement('div', { className: 'header__left flex items-center' }),
    _react2.default.createElement('div', { className: 'header__empty flex-auto' }),
    visibleLinks && visibleLinks.map(function (_ref2, index) {
      var label = _ref2.label,
          path = _ref2.path;

      return _react2.default.createElement(
        'div',
        { className: 'header__navigation', key: index },
        path === pathname ? _react2.default.createElement(
          'div',
          { className: 'header__navigation__item header__navigation__item--active' },
          label
        ) : _react2.default.createElement(
          _Link2.default,
          { className: 'header__navigation__item',
            href: path },
          label
        )
      );
    }),
    isSign && !firstName && !isSigninPage && _react2.default.createElement(
      _Button2.default,
      { className: 'button button--alive button--inverse button--border',
        href: '/signin' },
      'Sign In'
    ),
    children,
    firstName && _react2.default.createElement(
      'div',
      { className: 'header__navigation header__navigation--name' },
      _react2.default.createElement(
        _Link2.default,
        { className: (0, _classnames2.default)('header__navigation__item', {
            'header__navigation__item--active': pathname === '/account'
          }),
          href: '/account' },
        firstName
      ),
      !active && _react2.default.createElement(
        'svg',
        { className: 'header__navigation__alert' },
        _react2.default.createElement('circle', { className: 'header__navigation__alert__circle' })
      )
    ),
    firstName && _react2.default.createElement(
      'div',
      { className: 'header__avatar' },
      _react2.default.createElement(_Avatar2.default, { className: 'avatar header__avatar__img',
        id: id,
        imageUrl: imageUrl
      })
    ),
    id && _react2.default.createElement(
      'div',
      { className: 'header__bell' },
      _react2.default.createElement(_BellButton2.default, null)
    ),
    visibleLinks && visibleLinks.length > 0 && _react2.default.createElement(
      'div',
      { className: 'header__hamburger' },
      _react2.default.createElement(_HamburgerButton2.default, null)
    )
  );
};

Header.defaultProps = { isSign: true,
  LogoutLinkComponent: _transactionsUserWeb.LogoutLink
};

exports.default = (0, _transactionsInterfaceState.Header)(Header);