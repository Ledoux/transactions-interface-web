'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_Component) {
  _inherits(Navigation, _Component);

  function Navigation() {
    _classCallCheck(this, Navigation);

    return _possibleConstructorReturn(this, (Navigation.__proto__ || Object.getPrototypeOf(Navigation)).apply(this, arguments));
  }

  _createClass(Navigation, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props,
          closeNavigation = _props.closeNavigation,
          isActive = _props.isActive,
          pathname = _props.pathname;

      if (isActive && prevProps.pathname !== pathname) {
        closeNavigation();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          activePathname = _props2.activePathname,
          closeNavigation = _props2.closeNavigation,
          closeModal = _props2.closeModal,
          email = _props2.email,
          isActive = _props2.isActive,
          LogoutLinkComponent = _props2.LogoutLinkComponent,
          pathname = _props2.pathname,
          showModal = _props2.showModal,
          visibleLinks = _props2.visibleLinks;

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
          visibleLinks.map(function (_ref, idx) {
            var external = _ref.external,
                label = _ref.label,
                target = _ref.target,
                path = _ref.path;

            return _react2.default.createElement(
              'div',
              {
                className: 'navigation__list__item',
                key: idx
              },
              path === pathname ? _react2.default.createElement(
                'div',
                { className: 'navigation__list__item__link navigation__list__item__link--active' },
                label
              ) : _react2.default.createElement(
                _Link2.default,
                { className: 'block py2 navigation__list__item__link',
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
    }
  }]);

  return Navigation;
}(_react.Component);

Navigation.propTypes = { closeNavigation: _propTypes2.default.func.isRequired,
  activePathname: _propTypes2.default.string
};

var mapStateToProps = function mapStateToProps(_ref2) {
  var isActive = _ref2.navigation.isActive,
      pathname = _ref2.router.location.pathname,
      email = _ref2.user.email;

  return { email: email,
    isActive: isActive,
    pathname: pathname
  };
};
exports.default = (0, _reactRedux.connect)(mapStateToProps, { closeNavigation: _transactionsInterfaceState.closeNavigation })(Navigation);