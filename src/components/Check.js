import React, { Component } from 'react'
import { connect } from 'react-redux'
const { assignPipeline,
  getAutomaticSlug,
  getFormEntity,
  getPipelineEntities,
  getPipelineEntity,
  getTransactionsProps,
  closeModal
} = require('transactions-interface-state').default
import { mergeReselector } from 'transactions-redux-reselector'
import pluralize from 'pluralize'

import Card from './Card'
import Warning from './Warning'

const getDefaultIsEmptyForm = function () {
  return false
}

// this is where one entity edition/post can be done
class Check extends Component {
  constructor () {
    super()
    this.state = { hasRequestedOnce: false }
    this.handleNavigation = this._handleNavigation.bind(this)
  }
  componentDidMount () {
    this.handleNavigation()
  }
  componentDidUpdate () {
    this.handleNavigation()
  }
  componentWillUnmount () {
    this.props.dispatch(mergeReselector({
      WITH_SLUG: {
        slug: null
      }
    }))
  }
  _handleNavigation () {
    const { collectionName,
      dispatch,
      entityName,
      entities,
      entity,
      filterSlug,
      history,
      isEdit,
      isNew,
      isModalActive,
      newEntity,
      pipelineEntity,
      requestTransactions,
      slug
    } = this.props
    const { hasRequestedOnce } = this.state
    if (collectionName) {
      if (!slug) {
        // check first that we have data
        if (!entities && !hasRequestedOnce) {
          this.setState({hasRequestedOnce: true})
          dispatch(requestTransactions('GET',
            [ { collectionName } ],
            `${collectionName}-check`
          ))
          return
        }
        const automaticSlug = getAutomaticSlug(entities)
        if (automaticSlug) {
          history.push(`/content/check/${entityName}/${automaticSlug}`)
        }
      } else {
        // it is a content slug but we don't have yet the entity
        // because the filter slug is not set yet
        if (!isNew) {
          if (filterSlug !== slug) {
            dispatch(mergeReselector({
              WITH_SLUG: {
                slug
              }
            }))
            return
          }
        }
        // now make sure that we will have the entity (if it exists)
        if (!entity) {
          if (!hasRequestedOnce) {
            // either this is not the new mode,
            // so we have actually the slug and we can peacefully
            // get the matching already stored entity
            // Or actually we don't have the slug, buu actually
            // this new entity has some joined entities needed
            // and that are sotred in the new form object
            if (!isNew || newEntity) {
              this.setState({ hasRequestedOnce: true })
              dispatch(requestTransactions('GET',
                [ { collectionName, query: { slug } } ],
                collectionName
              ))
            }
          }
        } else if (!pipelineEntity) {
          dispatch(assignPipeline({
            [`${collectionName}ById`]: {
              [entity.id]: entity
            }}))
        }
      }
    }
  }
  render () {
    const { collectionName,
      ContentComponent,
      entity,
      entityName,
      getFilteredElements,
      getIsEmptyForm,
      history,
      isEdit,
      isNotPipelinedYet,
      pipelineEntity,
      requestTransactions,
      slug
    } = this.props
    let warningMessage
    const isNew = slug === 'new'
    if (!isNew && !isNotPipelinedYet && !entity) {
      warningMessage = `Warning, we did not find a good entity with the slug ${slug}`
    }
    if (typeof ContentComponent === 'undefined') {
      warningMessage = `Warning, we did not define yet a Card for the ${entityName} entity`
    }
    const transactionsProps = getTransactionsProps(this.props)
    return (<main className='page check main'>
      <div className='check__content'>
        {
          !warningMessage && ContentComponent && <Card
            ChildComponent={ContentComponent}
            {...entity}
            collectionName={collectionName}
            entityName={entityName}
            getIsEmptyForm={getIsEmptyForm}
            isTitle
            {...transactionsProps}
          />
        }
        { warningMessage && <Warning text={warningMessage} /> }
      </div>
    </main>)
  }
}

function mapStateToProps (state, {
  collectionName,
  entityName,
  getFilteredElements,
  isNew,
  slug
}) {
  const { cardViewer,
    formalizer,
    modal: {
      isActive
    },
    reselector: {
      WITH_SLUG
    }
  } = state
  const ContentComponent = entityName && cardViewer[entityName]
  const getIsEmptyForm = (entityName && formalizer[entityName]) || getDefaultIsEmptyForm
  const slugEntities = collectionName && getFilteredElements(state,
    'WITH_SLUG', collectionName)
  const entity = collectionName && slugEntities && slugEntities.length === 1 && slugEntities[0]
  const pipelineEntity = entity && getPipelineEntity(state,
    collectionName, entity.id)
  const newEntity = collectionName && isNew &&
    getFormEntity(state, collectionName, '_NEW_')
  const pipelineEntities = getPipelineEntities(state, collectionName)
  return { ContentComponent,
    entities: pipelineEntities.length > 0 && pipelineEntities,
    entity,
    filterSlug: WITH_SLUG.slug,
    getIsEmptyForm,
    isModalActive: isActive,
    newEntity,
    pipelineEntity
  }
}
export default connect(mapStateToProps, dispatch => {
  return { dispatch }
})(Check)
