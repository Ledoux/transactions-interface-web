'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SwitchButton = function (_Component) {
  _inherits(SwitchButton, _Component);

  function SwitchButton() {
    _classCallCheck(this, SwitchButton);

    var _this = _possibleConstructorReturn(this, (SwitchButton.__proto__ || Object.getPrototypeOf(SwitchButton)).call(this));

    _this.state = { isSwitchButtoned: false };
    _this.handleSwitchButtonClick = _this._handleSwitchButtonClick.bind(_this);
    return _this;
  }

  _createClass(SwitchButton, [{
    key: '_handleSwitchButtonClick',
    value: function _handleSwitchButtonClick() {
      this.setState({ isSwitchButtoned: !this.state.isSwitchButtoned });
      this.props.handleToggleClick();
    }
  }, {
    key: 'render',
    value: function render() {
      var handleSwitchButtonClick = this.handleSwitchButtonClick;
      var _props = this.props,
          className = _props.className,
          OnElement = _props.OnElement,
          OffElement = _props.OffElement;
      var isSwitchButtoned = this.state.isSwitchButtoned;

      return _react2.default.createElement(
        'button',
        {
          className: (0, _classnames2.default)({
            'switch-button--off': !isSwitchButtoned,
            'switch-button--on': isSwitchButtoned
          }, className),
          onClick: handleSwitchButtonClick
        },
        _react2.default.createElement(
          'div',
          null,
          isSwitchButtoned ? OnElement : OffElement
        )
      );
    }
  }]);

  return SwitchButton;
}(_react.Component);

SwitchButton.defaultProps = {
  OffElement: _react2.default.createElement(
    'p',
    null,
    ' OFF '
  ),
  OnElement: _react2.default.createElement(
    'p',
    null,
    ' ON '
  )
};

exports.default = SwitchButton;