import classnames from 'classnames'
import React from 'react'
const { getTransactionsProps } = require('transactions-interface-state').default

const Item = (props) => {
  const { BottomInteractionComponent,
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
  } = props
  const transactionsProps = getTransactionsProps(props)
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
          {...transactionsProps}
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
          {...transactionsProps}
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
          {...transactionsProps}
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
          {...transactionsProps}
        />
      </div>)
    }
  </div>)
}

export default Item
