import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { getNormalizerEntities } from 'transactions-redux-normalizer'

import Item from './Item'
import Search from './Search'
import Warning from './Warning'
import { getFilteredElements } from '../reducers/reselector'
import { ItemComponentsByCollectionName } from '../utils/views'

const List = ({ collectionName,
    entities,
    entityName,
    exploreState,
    BottomInteractionComponent,
    inputTemplate,
    interactionExtra,
    isSearch,
    isShrinked,
    isSmall,
    label,
    LeftInteractionComponent,
    maxDisplayCount,
    onExploreChange,
    placeholder,
    RightInteractionComponent
  }) => {
  let ContentComponent
  let warningMessage
  const entitiesLength = entities && entities.length
  if (collectionName && entitiesLength > 0) {
    ContentComponent = ItemComponentsByCollectionName[collectionName]
    if (typeof ContentComponent === 'undefined') {
      warningMessage = `Warning, we did not define yet an Item Component for ${collectionName}`
    }
  } else {
    warningMessage = `No ${collectionName} found`
  }
  const displayedLength = Math.min(maxDisplayCount, entitiesLength)
  const isNotTotal = maxDisplayCount && entitiesLength > maxDisplayCount
  const isMore = maxDisplayCount && isNotTotal
  return (<div className={classnames('list', {
    'list--shrinked': isShrinked
  })}>
    {
      ContentComponent && entities && entities
        .slice(0, displayedLength)
        .map((entity, index) => (<div
          className={classnames('list__child', {
            'list__child--shrinked': isShrinked,
            'list__child--small': isSmall
          })}
          key={index}>
            <Item
              ContentComponent={ContentComponent}
              BottomInteractionComponent={BottomInteractionComponent}
              exploreState={exploreState}
              interactionExtra={interactionExtra}
              isLast={index === displayedLength - 1}
              isShrinked={isShrinked}
              isSmall={isSmall}
              entity={entity}
              entityName={entityName}
              LeftInteractionComponent={LeftInteractionComponent}
              onExploreChange={onExploreChange}
              RightInteractionComponent={RightInteractionComponent}
            />
        </div>)
      )
    }
    {
      isMore && (<div
        className={classnames('list__child', {
          'list__child--shrinked': isShrinked,
          'list__child--shrinked--last': true,
          'list__child--small': isSmall
        })}
        key='more-item'>
          <Item
            collectionName={collectionName}
            exploreState={exploreState}
            isLast
            isShrinked={isShrinked}
            isSmall
            onExploreChange={onExploreChange}
            text={`Precise your search if you want to find other matching ${collectionName}`}
          />
      </div>)
    }
    { warningMessage && <Warning text={warningMessage} /> }
  </div>)
}

List.defaultProps = {
  label: 'default'
}

// we get the entities from the pipelined entities
// stored in the location reducer
function mapStateToProps(state, {
  collectionName,
  label
}) {
  const {
    reselector: {
      WITH_SIGN_SEARCH: {
        query,
        sign
      }
    }
  } = state
  // no need to go further if no collectionName
  if (!collectionName) {
    return {}
  }
  // let s see if we need to restrict because of a search filter
  const entities = getFilteredElements(state,
    (query && sign === label)
    ? 'WITH_SIGN_SEARCH'
    : 'ALL',
    collectionName, { isRecursive: true })
  return { entities }
}
export default connect(mapStateToProps)(List)
