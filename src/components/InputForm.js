import React, { Component } from 'react'
import DebounceInput from 'react-debounce-input';
import { connect } from 'react-redux'
const { deleteFormEntity,
  mergeForm,
  mergeFormEntity
} = require('transactions-interface-state').default
import { assignReselectorFilter } from 'transactions-redux-reselector'

class InputForm extends Component {
  constructor () {
    super()
    this.state = {
      value: null
    }
    this.handleChangeValue = this._handleChangeValue.bind(this)
  }
  shouldComponentUpdate (nextProps, nextState) {
    const { value } = this.state
    return !value || value !== nextState.value
  }
  componentDidUpdate () {
    const { collectionName,
      dispatch,
      entity,
      entityId,
      entityName,
      initialValue,
      isNew,
      joinCollectionName,
      joinKey,
      joinId,
      joinValue,
      label,
      name,
      requestTransactions
    } = this.props
    const { hasRequestedOnce,
      value
    } = this.state
    // all here is just necessary when we type
    // something in the input
    // so leave if not
    if (!value) {
      return
    }
    // first check that we adapted the filter
    if (joinValue !== value) {
      dispatch(assignReselectorFilter('WITH_SIGN_JOIN', {
        // do the sign given the label
        key: name,
        sign: label,
        value
      }))
    }
    // check that it exists in the db if we could not find it before
    if (!entity) {
      dispatch(requestTransactions('GET', [{
        collectionName,
        query: {
          [name]: value
        }
      }], collectionName))
    }
    // else we set the new form if we have new content
    if (entity && (isNew || joinId) && entityId !== entity.id) {
      dispatch(mergeForm({
        [`${joinCollectionName}ById`]: {
          [isNew ? '_NEW_' : joinId]: {
            [`${entityName}Id`]: entity.id
          }
        }
      }, {
        [`${collectionName}ById`]: {
          _NEW_: '_DELETE_'
        }
      }))
    } else if (value === initialValue) {
      // either we refuind the odl initial value
      // so we cancel what we just did
      dispatch(deleteFormEntity(collectionName, '_NEW_'))
    } else {
      // else we add in the new
      dispatch(mergeFormEntity(collectionName, entityId || '_NEW_', {
        [name]: value
      }))
    }
  }
  _handleChangeValue (event) {
    const { assignReselectorFilter,
      joinValue,
      label,
      name
    } = this.props
    // adapt the value locally
    const value = event.target.value || ''
    this.setState({ value })
  }
  render () {
    const { handleChangeValue } =  this
    const { className,
      entity,
      initialValue,
      isEdit,
      isHTML,
      isNew,
      itemProp,
      itemScope,
      itemType,
      label,
      name,
      slug,
      valueItemProp
    } = this.props
    let { value } = this.state
    if (typeof value !== 'string') {
      value = initialValue || ''
    }
    const isText = !isNew && !isEdit
    const info = value === initialValue
    ? '(FOUND)'
    : (entity ? '(NEW FOUND)' : '(NEW)')
    return (<div
      className={ className || 'input-form' }
      itemProp={itemProp}
      itemScope={itemScope}
      itemType={itemType}
    >
      {
        !isText && (<div className='input-form__title'>
           <label className='input-form__title__label'>
            {label} {info}
          </label>
        </div>)
      }
      <div className='input-form__content'>
      {
        isText
        ? (
          isHTML
          ? <div dangerouslySetInnerHTML={{ __html: value }} />
          : (<p
            className='input-form__content__text'
            itemProp={valueItemProp}
          >
            {value}
          </p>)
        )
        : <DebounceInput
            className='input-form__content__input'
            debounceTimeout={500}
            name={name}
            type='text'
            onChange={event => handleChangeValue(event)}
            required
            value={value}
          />
      }
    </div>
  </div>)
  }
}

function mapStateToProps(state, { collectionName,
  getFilteredElements,
  label
}) {
  const {
    reselector: {
      WITH_SIGN_JOIN: {
        key,
        sign,
        value
      }
    }
  } = state
  if (label === sign) {
    const entities = getFilteredElements(state, 'WITH_SIGN_JOIN', collectionName)
    const entity = entities.length === 1 && entities[0]
    return { entity,
      joinKey: key,
      joinValue: value
    }
  }
  return {}
}
export default connect(mapStateToProps,
  dispatch => { return { dispatch } })(InputForm)
