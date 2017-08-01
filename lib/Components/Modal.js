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

var _IconButton = require('./IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var closeModal = require('transactions-interface-state').default.closeModal;

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  function Modal() {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

    _this.onClickClose = _this._onClickClose.bind(_this);
    return _this;
  }

  _createClass(Modal, [{
    key: '_onClickClose',
    value: function _onClickClose() {
      var _props = this.props,
          beforeCloseModal = _props.beforeCloseModal,
          closeModal = _props.closeModal;

      if (beforeCloseModal) {
        beforeCloseModal();
      }
      closeModal();
    }
  }, {
    key: 'render',
    value: function render() {
      var onClickClose = this.onClickClose;
      var _props2 = this.props,
          content = _props2.content,
          isActive = _props2.isActive,
          isCtaCloseButton = _props2.isCtaCloseButton,
          isCornerCloseButton = _props2.isCornerCloseButton,
          isOutCloseButton = _props2.isOutCloseButton;

      var classes = (0, _classnames2.default)({
        'modal--active': isActive
      }, 'modal');
      return _react2.default.createElement(
        'div',
        { className: classes,
          role: 'dialog',
          onClick: isOutCloseButton && onClickClose
        },
        _react2.default.createElement(
          'div',
          {
            className: 'modal__dialog',
            role: 'document',
            onClick: function onClick(e) {
              e.nativeEvent.stopImmediatePropagation(); // Prevent click bubbling and closing modal
              e.stopPropagation();
            }
          },
          isCornerCloseButton && _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'button button--plain modal__close',
              onClick: onClickClose
            },
            '\u2715'
          ),
          _react2.default.createElement(
            'div',
            { className: 'modal__content' },
            content
          ),
          isCtaCloseButton && _react2.default.createElement(
            'div',
            { className: 'modal__close-cta' },
            _react2.default.createElement(_IconButton2.default, {
              className: 'button button--alive icon-button',
              icon: 'cross',
              onClick: onClickClose,
              text: 'Close'
            })
          )
        )
      );
    }
  }]);

  return Modal;
}(_react.Component);

Modal.PropTypes = {
  isActive: _propTypes2.default.bool.isRequired,
  beforeCloseModal: _propTypes2.default.func.isRequired,
  closeModal: _propTypes2.default.func.isRequired,
  content: _propTypes2.default.node
};

var mapStateToProps = function mapStateToProps(_ref) {
  var _ref$modal = _ref.modal,
      beforeCloseModal = _ref$modal.beforeCloseModal,
      content = _ref$modal.content,
      isActive = _ref$modal.isActive,
      isCtaCloseButton = _ref$modal.isCtaCloseButton,
      isCornerCloseButton = _ref$modal.isCornerCloseButton,
      isOutCloseButton = _ref$modal.isOutCloseButton;

  return { beforeCloseModal: beforeCloseModal,
    content: content,
    isActive: isActive,
    isCtaCloseButton: isCtaCloseButton,
    isCornerCloseButton: isCornerCloseButton,
    isOutCloseButton: isOutCloseButton
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, { closeModal: closeModal })(Modal);