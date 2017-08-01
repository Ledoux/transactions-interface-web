'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require$default = require('transactions-interface-state').default,
    closeModal = _require$default.closeModal,
    showModalWarning = _require$default.showModalWarning;

function getReturnState() {
  var returnTo = void 0;
  var returnMessage = void 0;
  var search = window.location.search;
  returnTo = (search.match(/returnTo=([^&]*)/) || [null, null])[1];
  returnMessage = (search.match(/returnMessage=([^&]*)/) || [null, null])[1];
  if (returnMessage) {
    returnMessage = decodeURIComponent(returnMessage);
  }
  return {
    returnTo: returnTo,
    returnMessage: returnMessage
  };
}

var SignForm = function (_Component) {
  _inherits(SignForm, _Component);

  function SignForm() {
    _classCallCheck(this, SignForm);

    var _this = _possibleConstructorReturn(this, (SignForm.__proto__ || Object.getPrototypeOf(SignForm)).call(this));

    var _getReturnState = getReturnState(),
        returnMessage = _getReturnState.returnMessage,
        returnTo = _getReturnState.returnTo;
    // it is important to initialize email and password with empty
    // string to make already the input components as controlled component
    // otherwise you will get this typical 'switched from uncontrolled' to 'controlled'
    // component from React error logs when you type text inside the input


    _this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      subscription: {
        selector: false,
        reviewer: false,
        editor: false
      },
      returnMessage: returnMessage,
      returnTo: returnTo
    };
    _this.handleChangeValue = _this._handleChangeValue.bind(_this);
    _this.handleClickCheckValue = _this._handleClickCheckValue.bind(_this);
    return _this;
  }

  _createClass(SignForm, [{
    key: '_handleChangeValue',
    value: function _handleChangeValue(event, key) {
      this.setState(_defineProperty({}, key, event.target.value));
    }
  }, {
    key: '_handleClickCheckValue',
    value: function _handleClickCheckValue(key, value) {
      var oldContent = this.state[key];
      this.setState(_defineProperty({}, key, Object.assign(oldContent, _defineProperty({}, value, !oldContent[value]))));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var returnMessage = this.state.returnMessage;
      var _props = this.props,
          history = _props.history,
          showModalWarning = _props.showModalWarning;

      if (returnMessage) {
        showModalWarning('exclamation', returnMessage);
        history.push(window.location.pathname);
        this.setState({ returnMessage: null });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var handleChangeValue = this.handleChangeValue,
          handleClickCheckValue = this.handleClickCheckValue;
      var _props2 = this.props,
          data = _props2.data,
          email = _props2.email,
          endpoint = _props2.endpoint,
          firstName = _props2.firstName,
          lastName = _props2.lastName,
          message = _props2.message,
          password = _props2.password,
          returnMessage = _props2.returnMessage,
          returnTo = _props2.returnTo,
          signPath = _props2.signPath;

      var isSignup = endpoint === 'signup';
      var isSignin = endpoint === 'signin';
      return _react2.default.createElement(
        'form',
        { className: 'sign-form p3',
          method: 'post',
          action: signPath + '/' + endpoint
        },
        isSignup && _react2.default.createElement(
          'div',
          { className: 'sign-form__entry' },
          _react2.default.createElement(
            'p',
            { className: 'sign-form__entry__field' },
            'First Name'
          ),
          _react2.default.createElement('input', {
            className: 'sign-form__entry__input field',
            name: 'firstName',
            type: 'text',
            value: firstName,
            onChange: function onChange(event) {
              return handleChangeValue(event, 'firstName');
            },
            required: true
          })
        ),
        isSignup && _react2.default.createElement(
          'div',
          { className: 'sign-form__entry' },
          _react2.default.createElement(
            'p',
            { className: 'sign-form__entry__field' },
            'Last Name'
          ),
          _react2.default.createElement('input', {
            className: 'sign-form__entry__input field',
            name: 'lastName',
            type: 'text',
            value: lastName,
            onChange: function onChange(event) {
              return handleChangeValue(event, 'lastName');
            },
            required: true
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'sign-form__entry' },
          _react2.default.createElement(
            'p',
            { className: 'sign-form__entry__field' },
            'Email'
          ),
          _react2.default.createElement('input', {
            className: 'sign-form__entry__input field',
            name: 'email',
            type: 'text',
            value: email,
            onChange: function onChange(event) {
              return handleChangeValue(event, 'email');
            },
            required: true
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'sign-form__entry' },
          _react2.default.createElement(
            'p',
            { className: 'sign-form__entry__field' },
            'Password'
          ),
          _react2.default.createElement('input', {
            className: 'sign-form__entry__input mb1',
            name: 'password',
            type: 'password',
            value: password,
            onChange: function onChange(event) {
              return handleChangeValue(event, 'password');
            },
            required: true
          }),
          isSignin && _react2.default.createElement(
            _Link2.default,
            {
              href: '/forgot-password' + (email ? '?email=' + encodeURIComponent(email) : '')
            },
            'Forgot Password ?'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'sign-form__message center' },
          message
        ),
        _react2.default.createElement(
          'div',
          { className: 'sign-form__submit center' },
          _react2.default.createElement(
            _Button2.default,
            {
              className: 'button button--alive button--cta',
              type: 'submit'
            },
            isSignin && 'Sign In',
            isSignup && 'Sign Up'
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'sign-form__option center' },
          isSignin && _react2.default.createElement(
            'div',
            { className: 'center' },
            'No account?',
            ' ',
            _react2.default.createElement(
              _Link2.default,
              {
                className: 'link',
                href: '/signup'
              },
              'Sign up'
            )
          ),
          isSignup && _react2.default.createElement(
            'div',
            { className: 'center' },
            'Already have an account?',
            ' ',
            _react2.default.createElement(
              _Link2.default,
              {
                href: '/signin' + (returnTo ? '?returnTo=' + returnTo : '')
              },
              'Sign In'
            )
          )
        )
      );
    }
  }]);

  return SignForm;
}(_react.Component);

exports.default = (0, _reactRedux.connect)(null, {
  closeModal: closeModal,
  showModalWarning: showModalWarning
})(SignForm);