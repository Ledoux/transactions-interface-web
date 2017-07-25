import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { assignReselectorFilter } from 'transactions-redux-reselector'

import IconButton from './IconButton'

const AND_SEPARATOR = ' '
const SEPARATOR = ':'

class Search extends Component {
  constructor () {
    super ()
    this.state = {}
    this.handleAddContent = this._handleAddContent.bind(this)
    this.handleRequestContent = this._handleRequestContent.bind(this)
    this.onChangeValue = this._onChangeValue.bind(this)
    this.onKeyPress = this._onKeyPress.bind(this)
  }
  componentDidMount () {
    const { assignReselectorFilter,
      label
    } = this.props
    assignReselectorFilter('WITH_SIGN_SEARCH', {
      sign: label
    })
  }
  _handleAddContent () {
    const { history,
      options
    } = this.props
    const addOption = options && options[0]
    // we can add content only if we are in the one option case
    if (addOption) {
      const { collectionName,
        entityName
      } = addOption
      const form = {
        [`${collectionName}ById`]: {
          _NEW_: {
          }
        }
      }
      history.push(`/content/check/${entityName}/new?form=${encodeURI(JSON.stringify(form))}`)
    }
  }
  _handleRequestContent () {
    const { getRequestQuery,
      observedCollectionName,
      options,
      query,
      requestTransactions
    } = this.props
    const requestQuery = (getRequestQuery && getRequestQuery(query)) || query
    requestTransactions('GET', options.map(({ collectionName }) => {
      return { collectionName,
        query: requestQuery
      }
    }))
  }
  _onChangeValue (event) {
    const { assignReselectorFilter,
      inputTemplate,
      label
    } = this.props
    // get from the target
    let value = event.target.value || ''
    let query = null
    // maybe the search has already an inputTemplate in which we inject the
    // input value
    if (inputTemplate && value.length > 0) {
      query = {}
      value.split(AND_SEPARATOR)
        .forEach((andValue, index) => {
          const replacedExpression = inputTemplate.replace(/\{\{value\}\}/g, andValue)
          const chunks = replacedExpression.split(SEPARATOR)
          query[`${index}_${chunks[0]}`] = chunks.slice(1).join(SEPARATOR)
        })
      assignReselectorFilter('WITH_SIGN_SEARCH', {
        query,
        sign: label
      })
      return
    }
    assignReselectorFilter('WITH_SIGN_SEARCH', {
      query
    })
  }
  componentWillMount () {
    this.props.assignReselectorFilter('WITH_SIGN_SEARCH', {
      query: null,
      sign: null
    })
  }
  _onKeyPress (event) {
    if(event.charCode === 13){
      event.preventDefault() // Ensure it is only this code that runs
      this.handleRequestContent()
    }
  }
  render () {
    const { handleAddContent,
      handleRequestContent,
      onChangeValue,
      onKeyPress
    } = this
    const { className,
      exploreState,
      interactions,
      isAdd,
      isSmall,
      onExploreChange,
      options,
      placeholder
    } = this.props
    return (<div className={className || 'search flex'}>
      {
        interactions && interactions.map(({ getClassName,
          icon,
          onClick
        }, index) => (<IconButton
          className={(getClassName && getClassName(exploreState)) || classnames(`button icon-button button--alive search__button`, {
            'search__button--small': isSmall
          })}
          key={index}
          icon={icon}
          onClick={event => onClick(event, exploreState)}
        />))
      }
      {
        isAdd && (<IconButton
          className={classnames(`button icon-button button--alive search__button`, {
            'search__button--small': isSmall
          })}
          icon='plus'
          onClick={handleAddContent}
        />)
      }
      <IconButton
        className={classnames(`button icon-button button--alive search__button`, {
          'search__button--small': isSmall
        })}
        icon='magnifying_glass'
        onClick={handleRequestContent}
      />
      <input
        className={classnames(`search__input flex-auto`, {
          'search__input--small': isSmall,
          'search__input--add': isAdd
        })}
        type='text'
        placeholder={placeholder}
        onChange={onChangeValue}
        onKeyPress={onKeyPress}
      />
    </div>)
  }
}

Search.defaultProps = {
  colNumber: 1,
  label: 'default',
  placeholder: 'type here for searching what you want'
}

function mapStateToProps({
  reselector: {
    WITH_SIGN_SEARCH: {
      query,
      sign
    }
  }
}, { label }) {
  return sign === label
  ? { query }
  : {}
}
export default connect(mapStateToProps,
  { assignReselectorFilter })(Search)
