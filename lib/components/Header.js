'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Avatar = require('./Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

var _BellButton = require('./BellButton');

var _BellButton2 = _interopRequireDefault(_BellButton);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _HamburgerButton = require('./HamburgerButton');

var _HamburgerButton2 = _interopRequireDefault(_HamburgerButton);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

var _Logo = require('./Logo');

var _Logo2 = _interopRequireDefault(_Logo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withoutSigninPaths = ['/signin', '/signup'];

var Header = function Header(_ref) {
  var active = _ref.active,
      firstName = _ref.firstName,
      id = _ref.id,
      imageUrl = _ref.imageUrl,
      isSigninPage = _ref.isSigninPage,
      menuLinks = _ref.menuLinks,
      pathname = _ref.pathname,
      projectName = _ref.projectName;

  return _react2.default.createElement(
    'div',
    { className: 'header flex justify-start items-center' },
    _react2.default.createElement(
      'div',
      { className: 'header__logo' },
      _react2.default.createElement(_Logo2.default, null)
    ),
    _react2.default.createElement(
      'div',
      { className: 'header__title' },
      projectName
    ),
    _react2.default.createElement('div', { className: 'header__empty flex-auto' }),
    menuLinks.map(function (_ref2, index) {
      var label = _ref2.label,
          path = _ref2.path;

      var isActiveLink = path.split('?')[0] === pathname;
      return _react2.default.createElement(
        'div',
        {
          className: 'header__navigation',
          key: index
        },
        _react2.default.createElement(
          _Link2.default,
          {
            className: (0, _classnames2.default)('header__navigation__item', {
              'header__navigation__item--active': isActiveLink
            }),
            href: path
          },
          label
        )
      );
    }),
    _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)('header__navigation', {
          'header__navigation--no-border': !firstName
        }) },
      !firstName && !isSigninPage && _react2.default.createElement(
        _Button2.default,
        {
          className: 'button button--alive button--cta',
          href: '/signin' },
        'Sign In'
      )
    ),
    firstName && _react2.default.createElement(
      'div',
      {
        className: 'header__navigation header__navigation--name'
      },
      _react2.default.createElement(
        _Link2.default,
        {
          className: (0, _classnames2.default)('header__navigation__item', {
            'header__navigation__item--active': pathname === '/account'
          }),
          href: '/account'
        },
        firstName
      ),
      !active && _react2.default.createElement(
        'svg',
        { className: 'header__navigation__alert' },
        _react2.default.createElement('circle', { className: 'header__navigation__alert__circle' })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'header__avatar' },
      _react2.default.createElement(_Avatar2.default, {
        className: 'avatar header__avatar__img',
        id: id
      })
    ),
    id && _react2.default.createElement(
      'div',
      { className: 'header__bell' },
      _react2.default.createElement(_BellButton2.default, null)
    ),
    _react2.default.createElement(
      'div',
      { className: 'header__hamburger' },
      _react2.default.createElement(_HamburgerButton2.default, null)
    )
  );
};

Header.defaultProps = {
  menuLinks: [],
  projectName: 'Transactions'
};

function mapStateToProps(_ref3, _ref4) {
  var _ref3$user = _ref3.user,
      active = _ref3$user.active,
      firstName = _ref3$user.firstName,
      id = _ref3$user.id,
      imageUrl = _ref3$user.imageUrl;
  var pathname = _ref4.pathname;

  return { active: active,
    firstName: firstName,
    id: id,
    imageUrl: imageUrl,
    isSigninPage: withoutSigninPaths.includes(pathname)
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(Header);