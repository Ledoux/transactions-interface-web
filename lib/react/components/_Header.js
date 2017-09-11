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

var _Navigation = require('./Navigation');

var _Navigation2 = _interopRequireDefault(_Navigation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var withoutSigninPaths = ['/signin', '/signup'];

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    var _this = _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this));

    _this.state = { visibleLinks: null };
    _this.handleFilterVisibleLinks = _this._handleSetVisibleLinks.bind(_this);
    return _this;
  }

  _createClass(Header, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.handleFilterVisibleLinks(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.handleFilterVisibleLinks(nextProps);
    }
  }, {
    key: '_handleSetVisibleLinks',
    value: function _handleSetVisibleLinks(props) {
      var menuLinks = props.menuLinks;

      menuLinks && this.setState({ visibleLinks: menuLinks.filter(function (_ref) {
          var getIsVisible = _ref.getIsVisible;
          return !getIsVisible || getIsVisible(props);
        }) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          active = _props.active,
          firstName = _props.firstName,
          id = _props.id,
          imageUrl = _props.imageUrl,
          isSigninPage = _props.isSigninPage,
          LogoutLinkComponent = _props.LogoutLinkComponent,
          menuLinks = _props.menuLinks,
          pathname = _props.pathname,
          siteName = _props.siteName;
      var visibleLinks = this.state.visibleLinks;

      return _react2.default.createElement(
        'div',
        { className: 'header flex justify-start items-center' },
        _react2.default.createElement(_Navigation2.default, {
          LogoutLinkComponent: LogoutLinkComponent,
          visibleLinks: visibleLinks
        }),
        _react2.default.createElement(
          _Link2.default,
          { className: 'header__link flex justify-start items-center', href: '/home' },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(_Logo2.default, null)
          ),
          _react2.default.createElement(
            'div',
            { className: 'header__link__title' },
            siteName
          )
        ),
        _react2.default.createElement('div', { className: 'header__empty flex-auto' }),
        visibleLinks && visibleLinks.map(function (_ref2, index) {
          var label = _ref2.label,
              path = _ref2.path;

          console.log('path === pathname', path === pathname);
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
          { className: 'header__navigation header__navigation--name' },
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
    }
  }]);

  return Header;
}(_react.Component);

Header.defaultProps = {
  menuLinks: [],
  siteName: 'Transactions'
};

function mapStateToProps(_ref3) {
  var authorization = _ref3.authorization,
      pathname = _ref3.router.location.pathname,
      user = _ref3.user;

  var newState = { isSigninPage: withoutSigninPaths.includes(pathname),
    pathname: pathname
  };
  if (authorization) {
    var visibleModes = authorization.visibleModes;

    Object.assign(newState, { visibleModes: visibleModes });
  }
  if (user) {
    var active = user.active,
        firstName = user.firstName,
        id = user.id,
        imageUrl = user.imageUrl;

    Object.assign(newState, { active: active,
      firstName: firstName,
      id: id,
      imageUrl: imageUrl
    });
  }
  return newState;
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(Header);