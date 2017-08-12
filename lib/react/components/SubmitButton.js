'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _Confirmation = require('./Confirmation');

var _Confirmation2 = _interopRequireDefault(_Confirmation);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require$default = require('transactions-interface-state').default,
    getFormPutOptions = _require$default.getFormPutOptions,
    getUpdatedSearchString = _require$default.getUpdatedSearchString,
    resetForm = _require$default.resetForm,
    showModal = _require$default.showModal;

var SubmitButton = function SubmitButton(_ref) {
  var collectionName = _ref.collectionName,
      ConfirmationComponent = _ref.ConfirmationComponent,
      dispatch = _ref.dispatch,
      entity = _ref.entity,
      entityName = _ref.entityName,
      firstName = _ref.firstName,
      form = _ref.form,
      formPutOptions = _ref.formPutOptions,
      getIsEmptyForm = _ref.getIsEmptyForm,
      history = _ref.history,
      isEdit = _ref.isEdit,
      isNew = _ref.isNew,
      requestTransactions = _ref.requestTransactions;

  var isEmptyForm = !form || getIsEmptyForm && getIsEmptyForm(form, {
    entity: entity,
    isNew: isNew,
    isEdit: isEdit
  }) || false;
  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)('button button--alive check-submit-button', {
        'button--disabled': isEmptyForm
      }),
      disabled: isEmptyForm,
      onClick: function onClick() {
        if (isEdit || isNew) {
          dispatch(resetForm());
          formPutOptions && dispatch(requestTransactions('PUT', formPutOptions));
          history.push('/home?isForcingLocationChange=true');
        } else {
          history.push(window.location.pathname + '?isEdit=true');
        }
        dispatch(showModal(_react2.default.createElement(ConfirmationComponent, null), { isCtaCloseButton: true }));
      }
    },
    'Submit'
  );
};

SubmitButton.defaultProps = {
  ConfirmationComponent: _Confirmation2.default
};

function mapStateToProps(state) {
  var form = state.form,
      firstName = state.user.firstName;

  var formPutOptions = getFormPutOptions(state);
  return { firstName: firstName,
    form: form,
    formPutOptions: formPutOptions
  };
}
exports.default = (0, _reactRedux.connect)(mapStateToProps, function (dispatch) {
  return { dispatch: dispatch };
})(SubmitButton);