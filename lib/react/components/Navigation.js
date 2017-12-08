'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _transactionsInterfaceState = require('transactions-interface-state');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navigation = function Navigation(_ref) {
  var closeNavigation = _ref.closeNavigation,
      closeModal = _ref.closeModal,
      email = _ref.email,
      isActive = _ref.isActive,
      LogoutLinkComponent = _ref.LogoutLinkComponent,
      pathname = _ref.pathname,
      showModal = _ref.showModal,
      visibleLinks = _ref.visibleLinks;

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
      visibleLinks && visibleLinks.map(function (_ref2, idx) {
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
        { className: 'navigation__list__item-container',
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

exports.default = (0, _transactionsInterfaceState.Navigation)(Navigation);