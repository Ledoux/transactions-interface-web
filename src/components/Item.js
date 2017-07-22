import classnames from 'classnames'
import React from 'react'

const Item = ({ BottomInteractionComponent,
  className,
  collectionName,
  ContentComponent,
  exploreState,
  interactionExtra,
  isLast,
  isShrinked,
  isSmall,
  entity,
  entityName,
  LeftInteractionComponent,
  onExploreChange,
  RightInteractionComponent,
  text
}) => {
  return (<div className={classnames(className || 'item', {
    'item--shrinked': isShrinked,
    'item--shrinked--last': isShrinked && isLast,
    'item--small': isSmall
  })}>
    {
      LeftInteractionComponent && (<div
        className={classnames('item__left-interaction col', {
          'item__left-interaction--shrinked': isShrinked
        })}>
        <LeftInteractionComponent
          entityName={entityName}
          exploreState={exploreState}
          onExploreChange={onExploreChange}
          {...entity}
          {...interactionExtra}
        />
      </div>)
    }
    <div className={classnames('item__content', {
      'col': LeftInteractionComponent,
      'item__content--text flex items-center': text })
    }>
      {
        ContentComponent && <ContentComponent
          collectionName={collectionName}
          {...entity}
        />
      }
      {
        text && (<p className='item__content__text'>
          {text}
        </p>)
      }
    </div>
    {
      RightInteractionComponent && (<div
        className={classnames('item__right-interaction ', {
          'item__right-interaction--shrinked': isShrinked
        })}>
        <RightInteractionComponent
          entityName={entityName}
          exploreState={exploreState}
          onExploreChange={onExploreChange}
          {...entity}
          {...interactionExtra}
        />
      </div>)
    }
    {
      BottomInteractionComponent && (<div
        className='item__bottom-interaction'>
        <BottomInteractionComponent
          entityName={entityName}
          exploreState={exploreState}
          onExploreChange={onExploreChange}
          {...entity}
          {...interactionExtra}
        />
      </div>)
    }
  </div>)
}

export default Item
