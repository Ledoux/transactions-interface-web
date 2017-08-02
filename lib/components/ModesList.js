'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _ModeItem = require('./ModeItem');

var _ModeItem2 = _interopRequireDefault(_ModeItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ModesList = function (_Component) {
  _inherits(ModesList, _Component);

  function ModesList() {
    _classCallCheck(this, ModesList);

    var _this = _possibleConstructorReturn(this, (ModesList.__proto__ || Object.getPrototypeOf(ModesList)).call(this));

    _this.state = {
      text: null
    };
    _this.handleMouseEnter = _this._handleMouseEnter.bind(_this);
    _this.handleMouseExit = _this._handleMouseExit.bind(_this);
    return _this;
  }

  _createClass(ModesList, [{
    key: '_handleMouseEnter',
    value: function _handleMouseEnter(text) {
      this.setState({ text: text });
    }
  }, {
    key: '_handleMouseExit',
    value: function _handleMouseExit(text) {
      this.setState({ text: null });
    }
  }, {
    key: 'render',
    value: function render() {
      var handleMouseEnter = this.handleMouseEnter,
          handleMouseExit = this.handleMouseExit;
      var _props = this.props,
          iconMode = _props.iconMode,
          visibleModes = _props.visibleModes;
      var text = this.state.text;

      return _react2.default.createElement(
        'div',
        { className: 'modes-list' },
        _react2.default.createElement(
          'p',
          { className: 'modes-list__title' },
          'Choose the mode you want to turn into'
        ),
        _react2.default.createElement(
          'div',
          { className: 'modes-list__box' },
          _react2.default.createElement(
            'div',
            { className: 'modes-list__box__options col col-4' },
            visibleModes.map(function (visibleMode, index) {
              return _react2.default.createElement(
                'div',
                {
                  className: 'modes-list__box__options__item',
                  key: index
                },
                _react2.default.createElement(_ModeItem2.default, _extends({
                  handleMouseEnter: handleMouseEnter,
                  handleMouseExit: handleMouseExit,
                  index: index }, visibleMode, {
                  isList: true
                }))
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'modes-list__box__info col col-8' },
            text && _react2.default.createElement(
              'p',
              { className: 'modes-list__box__info__text' },
              text
            )
          )
        )
      );
    }
  }]);

  return ModesList;
}(_react.Component);

function mapStateToProps(_ref) {
  var modes = _ref.authorization.modes,
      mode = _ref.mode;

  var specialModes = modes && modes.filter(function (mode) {
    return mode.name !== 'guest';
  }) || [];
  return {
    iconMode: mode && mode.icon,
    visibleModes: (specialModes.length > 0 ? specialModes : modes) || []
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps)(ModesList);