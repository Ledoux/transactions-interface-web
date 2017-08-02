import pluralize from 'pluralize'
import React, { Component } from 'react'
import { connect } from 'react-redux'
const { closeModal,
  getAutomaticCollectionName,
  setAuthorizationSelectedMode,
  showModal
} = require('transactions-interface-state').default

import Check from '../components/Check'
import Explore from '../components/Explore'

const TaskComponentsByName = {
  Check,
  Explore
}

class ContentPage extends Component {
  constructor () {
    super()
    this.handleNavigation = this._handleNavigation.bind(this)
  }
  componentDidMount () {
    this.handleNavigation()
  }
  componentDidUpdate () {
    this.handleNavigation()
  }
  _handleNavigation () {
    const { availableCollectionNames,
      availableSingularOrPluralNames,
      dispatch,
      entityName,
      history,
      isModalActive,
      modes,
      modeName,
      modeNamesBySingularOrPluralName,
      singularOrPluralName,
      showModalModesList,
      taskName
    } = this.props
    // first it is not necessary to contine if we don't have modes or if we are not
    // in a content page
    if (!taskName || !modes) {
      return
    }
    // if we have modes then go for determining content
    if (!singularOrPluralName) {
      if (!modeName) {
        if (modes && modes.length > 0) {
          dispatch(showModalModesList
            ? showModalModesList()
            : showModal('You need to choose a mode')
          )
        } else {
          console.log('WE DON t have yet some modes')
          return
        }
      } else {
        // for now pick it randomly
        const automaticCollectionName = getAutomaticCollectionName(availableCollectionNames)
        if (automaticCollectionName) {
          const singularOrPluralName = taskName === 'check'
          ? pluralize(automaticCollectionName, 1)
          : automaticCollectionName
          history.push(`/content/${taskName}/${singularOrPluralName}`)
        }
      }
    } else {
      // check that maybe we changed the mode so the singularOrPluralName is deprecated
      if (availableSingularOrPluralNames &&
        !availableSingularOrPluralNames.includes(singularOrPluralName)) {
        history.push(`/content/${taskName}`)
        return
      }
      // and let's find automatically what it is
      const matchingModeName = modeNamesBySingularOrPluralName[singularOrPluralName]
      if (matchingModeName) {
        const suggestedMode = modes.find(mode => mode.name === matchingModeName)
        // only set a new authorization if we have a good suggested mode
        // and that actually we are not already in that mode
        if (suggestedMode && modeName !== suggestedMode.name) {
          dispatch(setAuthorizationSelectedMode(suggestedMode))
        }
      }
    }
  }
  render () {
    const { getFilteredElements,
      history,
      isEdit,
      modeName,
      requestTransactions,
      singularOrPluralName,
      slug,
      taskName
    } = this.props
    const componentName = (taskName &&
      `${taskName[0].toUpperCase()}${taskName.slice(1)}`) || 'Explore'
    const TaskComponent = TaskComponentsByName[componentName]
    let collectionName
    let entityName
    if (singularOrPluralName) {
      if (taskName === 'check') {
        collectionName = pluralize(singularOrPluralName, 2)
        entityName = singularOrPluralName
      } else {
        collectionName = singularOrPluralName
        entityName = pluralize(singularOrPluralName, 1)
      }
    }
    const isNew = slug === 'new'
    const label = `content-${collectionName}`
    const options = [{
      collectionName,
      entityName,
      label
    }]
    return (<div className='content-page'>
      <TaskComponent
        collectionName={collectionName}
        entityName={entityName}
        getFilteredElements={getFilteredElements}
        history={history}
        label={label}
        isEdit={isEdit}
        isNew={isNew}
        modeName={modeName}
        requestTransactions={requestTransactions}
        slug={slug}
        options={options}
      />
    </div>)
  }
}

function mapStateToProps ({
  authorization: { mode,
    modeNamesBySingularOrPluralName,
    modes
  },
  modal: { isActive }
}) {
  return {
    availableCollectionNames: mode && mode.availableCollectionNames,
    availableSingularOrPluralNames: mode && mode.availableSingularOrPluralNames,
    isModalActive: isActive,
    modeName: mode && mode.name,
    modeNamesBySingularOrPluralName,
    modes
  }
}
export default connect(mapStateToProps, dispatch => {
  return { dispatch }
})(ContentPage)
