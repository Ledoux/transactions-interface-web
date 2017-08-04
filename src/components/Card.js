import React, { Component } from 'react'
import { connect } from 'react-redux'
const { getFormEntity,
  getNewForm,
  getTransactionsProps,
  resetForm,
  setForm
} = require('transactions-interface-state').default
import { getNotStoredOptions } from 'transactions-redux-normalizer'
import shortid from 'shortid'

import Control from './Control'

class Card extends Component {
  constructor () {
    super ()
    this.handleUpdateForm = this._handleUpdateForm.bind(this)
    this.state = {
      hasRequestedOnce: false
    }
  }
  _handleUpdateForm () {
    const { collectionName,
      entity,
      entityName,
      getSlugByEntityName,
      isNew,
      newForm,
      notStoredOptions,
      requestTransactions,
      setForm,
      search,
      userId,
      userSlug
    } = this.props
    const { hasRequestedOnce } = this.state
    // check if we are not in the new situation in where
    // we don't have yet filled the form with an empty entity
    if (isNew && !entity.id) {
      // check first if we already downloaded the joined entities
      if (!hasRequestedOnce && notStoredOptions && notStoredOptions.length > 0) {
        this.setState({hasRequestedOnce: true})
        requestTransactions('GET', notStoredOptions, 'form')
      }
      // look if there is not already some properties in the search
      const collectionKey = `${collectionName}ById`
      const form = newForm || {
        [collectionKey]: { _NEW_: {} }
      }
      // warning
      if (!form[collectionKey]) {
        console.warn(`In the Card Component,
          you need a form with ${collectionKey}`)
        return
      }
      const newEntity = form[collectionKey]._NEW_
      if (!newEntity) {
        console.warn(`In the Card Component,
          you need a form with a new entity`)
        return
      }
      if (newEntity.encodedUrl) {
        newEntity.url = decodeURIComponent(newEntity.encodedUrl)
      }
      const newSlug = newEntity.slug
      if (!newSlug) {
        const slug = getSlugByEntityName[entityName](
          Object.assign({}, entity, newEntity)) || shortid()
        console.warn(`In the Card Component,
          you need a new entity with a slug`)
        return
      }
      // give automatically the user id
      Object.assign(newEntity, {
        id: '_NEW_',
        slug: `${newSlug}__USER__${userSlug}`,
        userId
      })
      // set
      setForm(form)
    }
  }
  componentDidMount () {
    this.handleUpdateForm()
  }
  componentDidUpdate () {
    this.handleUpdateForm()
  }
  componentWillUnmount () {
    this.props.resetForm()
  }
  render () {
    const { entity,
      ChildComponent,
      getIsEmptyForm
    } = this.props
    const { isControl } = (ChildComponent.WrappedComponent || ChildComponent).defaultProps
    const transactionsProps = getTransactionsProps(this.props)
    return (<div className='card'>
      {
        isControl && <Control
          getIsEmptyForm={getIsEmptyForm}
          {...transactionsProps}
        />
      }
      <ChildComponent
        {...entity}
        {...transactionsProps}
      />
    </div>)
  }
}

function mapStateToProps (state, ownProps) {
  const { collectionName } = ownProps
  const { scrap,
    user: {
      id,
      slug
    }
  } = state
  const formEntity = getFormEntity(state, collectionName, '_NEW_')
  const newForm = getNewForm()
  const notStoredOptions = newForm && getNotStoredOptions(state,
    newForm,
    { appSchema }
  )
  const entity = Object.assign({}, ownProps, scrap, formEntity)
  return { entity,
    newForm,
    notStoredOptions,
    userId: id,
    userSlug: slug
  }
}
export default connect(mapStateToProps, {
  resetForm,
  setForm
})(Card)
