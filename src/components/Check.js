import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mergeReselector } from 'transactions-redux-reselector'
import pluralize from 'pluralize'

import Card from './Card'
import CheckControls from './CheckControls'
import Warning from './Warning'
import { history } from '../containers/Root'
const { getFormEntity } = require('../reducers/form').default
import { closeModal } from '../reducers/modal'
const { assignPipeline,
  getPipelineEntities,
 getPipelineEntity } = require('../reducers/pipeline').default
import { getFilteredElements } from '../reducers/reselector'
import { requestTransactionsContent } from '../reducers/transactions'
import { getIsEmptyFormByEntityName } from '../utils/form'
import { getAutomaticSlug } from '../utils/navigation'
import { CardComponentsByEntityName } from '../utils/views'

const withoutControlsCollectionNames = [
  'articles',
  'articleReviews',
  'articleVerdicts',
  'claims',
  'claimReviews',
  'links'
]

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
    this.props.mergeReselector({
      WITH_SLUG: {
        slug: null
      }
    })
  }
  _handleNavigation () {
    const { assignPipeline,
      closeModal,
      collectionName,
      entityName,
      entities,
      entity,
      filterSlug,
      isEdit,
      isNew,
      isModalActive,
      mergeReselector,
      newEntity,
      pipelineEntity,
      requestTransactionsContent,
      slug
    } = this.props
    const { hasRequestedOnce } = this.state
    if (collectionName) {
      if (!slug) {
        // check first that we have data
        if (!entities && !hasRequestedOnce) {
          this.setState({hasRequestedOnce: true})
          requestTransactionsContent('GET',
            [ { collectionName } ],
            `${collectionName}-check`
          )
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
            mergeReselector({
              WITH_SLUG: {
                slug
              }
            })
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
              requestTransactionsContent('GET',
                [ { collectionName, query: { slug } } ],
                collectionName
              )
            }
          }
        } else if (!pipelineEntity) {
          assignPipeline({
            [`${collectionName}ById`]: {
              [entity.id]: entity
            }})
        }
      }
    }
  }
  render () {
    const { collectionName,
      entity,
      entityName,
      isEdit,
      isNotPipelinedYet,
      pipelineEntity,
      slug
    } = this.props
    let warningMessage
    const isNew = slug === 'new'
    if (!isNew && !isNotPipelinedYet && !entity) {
      warningMessage = `Warning, we did not find a good entity with the slug ${slug}`
    }
    const ContentComponent = entityName && CardComponentsByEntityName[entityName]
    if (typeof ContentComponent === 'undefined') {
      warningMessage = `Warning, we did not define yet a Card for the ${entityName} entity`
    }
    let getIsEmptyForm = getIsEmptyFormByEntityName[entityName]
    if (!getIsEmptyForm) {
      getIsEmptyForm = function () {
        return false
      }
    }
    return (<main className='page check main'>
      <div className='check__control'>
        {
          !withoutControlsCollectionNames.includes(collectionName) && <CheckControls
            collectionName={collectionName}
            entity={entity}
            entityName={entityName}
            getIsEmptyForm={getIsEmptyForm}
            isEdit={isEdit}
            isNew={isNew}
            pipelineEntity={pipelineEntity}
          />
        }
      </div>
      <div className='check__content'>
        {
          !warningMessage && ContentComponent && <Card
            ChildComponent={ContentComponent}
            {...entity}
            collectionName={collectionName}
            entityName={entityName}
            getIsEmptyForm={getIsEmptyForm}
            isEdit={isEdit}
            isNew={isNew}
            isTitle
          />
        }
        { warningMessage && <Warning text={warningMessage} /> }
      </div>
    </main>)
  }
}

function mapStateToProps (state, {
  collectionName,
  isNew,
  slug
}) {
  const {
    modal: {
      isActive
    },
    reselector: {
      WITH_SLUG
    }
  } = state
  const slugEntities = collectionName && getFilteredElements(state,
    'WITH_SLUG', collectionName)
  const entity = collectionName && slugEntities && slugEntities.length === 1 && slugEntities[0]
  const pipelineEntity = entity && getPipelineEntity(state,
    collectionName, entity.id)
  const newEntity = collectionName && isNew &&
    getFormEntity(state, collectionName, '_NEW_')
  const pipelineEntities = getPipelineEntities(state, collectionName)
  return {
    entities: pipelineEntities.length > 0 && pipelineEntities,
    entity,
    filterSlug: WITH_SLUG.slug,
    isModalActive: isActive,
    newEntity,
    pipelineEntity
  }
}
export default connect(mapStateToProps, {
  assignPipeline,
  closeModal,
  mergeReselector,
  requestTransactionsContent
})(Check)
