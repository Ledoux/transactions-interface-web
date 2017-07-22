import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Button from './Button'
import List from './List'
import Search from './Search'
import { requestTransactionsContent } from '../reducers/transactions'

class Explore extends Component {
  constructor (props) {
    super ()
    this.state = {
      selectedIndexes: props.options && [0]
    }
    this.handleRequestContent = this._handleRequestContent.bind(this)
    this.onExploreChange = this._onExploreChange.bind(this)
  }
  _handleRequestContent () {
    const { label,
      options,
      requestTransactionsContent
    } = this.props
    // given the frontend options
    // we here adapt the options necessary for
    // the backend request
    const requestOptions = options
      //.filter(option => option.query)
      .map(({collectionName, query}) => {
        return { collectionName,
          query
        }
      })
    if (requestOptions.length > 0) {
      requestTransactionsContent('GET', requestOptions,
        `${label}-explore`)
    }
  }
  componentDidMount () {
    this.handleRequestContent()
  }
  componentDidUpdate (prevProps) {
    const { options } = this.props
    // look for a state with one single collection
    if ((!prevProps.options || prevProps.options.length !== 1)
      && options && options.length === 1) {
      this.setState({selectedIndexes: [0]})
    }
    // look for new backend request
    if (prevProps.options !== options) {
      // this.handleRequestContent()
    }
  }
  _onExploreChange (state) {
    this.setState(state)
  }
  render () {
    const { getRequestQuery,
      inputTemplate,
      interactions,
      isAdd,
      isEdit,
      isNew,
      isShrinked,
      isSmall,
      label,
      options,
      placeholder
    } = this.props
    const { explore,
      selectedIndexes
    } = this.state
    const selectedOptions = selectedIndexes.map(selectedIndex =>
      options[selectedIndex])
    selectedOptions.sort((a, b) => a.collectionName - b.collectionName)
    const isSelection = options && options.length > 1
    const isLists = selectedOptions.length > 0
    return (<div className='explore'>
      <div className={classnames('explore__search', {
        'explore__search--shrinked': isShrinked
      })}>
        <Search
          exploreState={this.state}
          getRequestQuery={getRequestQuery}
          interactions={interactions}
          inputTemplate={inputTemplate}
          isAdd
          label={label}
          onExploreChange={this.onExploreChange}
          options={selectedOptions}
          placeholder={placeholder}
        />
      </div>
      <div className='explore__collections flex flex-wrap'>
        {
          isSelection && options.map(({collectionName}, index) => {
            const isSelected = selectedIndexes.includes(index)
            return (<Button
              className={classnames('button button--alive explore__collections__child', {
                'explore__collections__child--selected': isSelected
              })}
              key={index}
              onClick={() => {
                const newSelectedIndexes = isSelected
                ? selectedIndexes.filter(selectedIndex => selectedIndex !== index)
                : selectedIndexes.concat([index])
                this.setState({ selectedIndexes: newSelectedIndexes })
              }}
            >
              {collectionName}
            </Button>)
          })
        }
      </div>
      <div className={classnames('explore__lists', {
        'explore__lists--shrinked': isShrinked
      })}>
        {
          isLists && selectedOptions.map((selectedOption, index) => {
            return (<div
              className='explore__lists__child'
              key={index}
            >
              {
                isSelection && <p className='explore__lists__child__title'>
                  {selectedOption.collectionName}
                </p>
              }
              <List
                exploreState={this.state}
                isEdit={isEdit}
                isNew={isNew}
                isShrinked={isShrinked}
                isSmall={isSmall}
                label={label}
                onExploreChange={this.onExploreChange}
                {...selectedOption}
              />
            </div>)
          })
        }
      </div>
    </div>)
  }
}

export default connect(null, {
  requestTransactionsContent
})(Explore)
