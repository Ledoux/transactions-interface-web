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

var _Root = require('../containers/Root');

var _modal = require('../reducers/modal');

var _transactions = require('../reducers/transactions');

var _classes = require('../utils/classes');

var _navigation = require('../utils/navigation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require$default = require('../reducers/form').default,
    getFormPutOptions = _require$default.getFormPutOptions,
    resetForm = _require$default.resetForm;

var CheckSubmitButton = function CheckSubmitButton(_ref) {
  var collectionName = _ref.collectionName,
      entity = _ref.entity,
      entityName = _ref.entityName,
      firstName = _ref.firstName,
      form = _ref.form,
      formPutOptions = _ref.formPutOptions,
      getIsEmptyForm = _ref.getIsEmptyForm,
      isEdit = _ref.isEdit,
      isNew = _ref.isNew,
      requestTransactionsContent = _ref.requestTransactionsContent,
      requestTransactionsMode = _ref.requestTransactionsMode,
      resetForm = _ref.resetForm,
      showModal = _ref.showModal;

  var requestTransactionsMethod = collectionName === 'users' ? requestTransactionsMode : requestTransactionsContent;
  var isEmptyForm = !form || getIsEmptyForm && getIsEmptyForm(form, {
    entity: entity,
    isNew: isNew,
    isEdit: isEdit
  }) || false;
  return _react2.default.createElement(
    _Button2.default,
    {
      className: (0, _classnames2.default)(_classes.BUTTON_CLASS + ' check-submit-button', {
        'button--disabled': isEmptyForm
      }),
      disabled: isEmptyForm,
      onClick: function onClick() {
        if (isEdit || isNew) {
          resetForm();
          formPutOptions && requestTransactionsMethod('PUT', formPutOptions);
          _Root.history.push('/home?isForcingLocationChange=true');
        } else {
          _Root.history.push(window.location.pathname + '?isEdit=true');
        }
        showModal(_react2.default.createElement(_Confirmation2.default, null), { isCtaCloseButton: true });
      }
    },
    'Submit'
  );
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
exports.default = (0, _reactRedux.connect)(mapStateToProps, {
  requestTransactionsContent: _transactions.requestTransactionsContent,
  requestTransactionsMode: _transactions.requestTransactionsMode,
  resetForm: resetForm,
  showModal: _modal.showModal
})(CheckSubmitButton);