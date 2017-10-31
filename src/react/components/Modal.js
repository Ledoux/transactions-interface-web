import classnames from 'classnames'
import React from 'react'
import { Modal as withState } from 'transactions-interface-state'

import IconButton from './IconButton'
import Warning from './Warning'

const Modal = ({ content,
  isActive,
  isCtaCloseButton,
  isCornerCloseButton,
  isOutCloseButton,
  onCloseClick
}) => {
  const classes = classnames({
    'modal--active': isActive
  }, 'modal')
  return (
    <div className={classes}
      role='dialog'
      onClick={() => isOutCloseButton && onCloseClick()}>
      <div className='modal__dialog'
        role='document'
        onClick={e => {
          e.nativeEvent.stopImmediatePropagation() // Prevent click bubbling and closing modal
          e.stopPropagation()
        }}>
        {
          isCornerCloseButton && (
            <button type='button'
              className='button button--plain modal__close'
              onClick={onCloseClick}>
              ✕
            </button>
          )
        }
        <div className='modal__content'>
          {content}
        </div>
        {
          isCtaCloseButton && (
            <div className='modal__close-cta'>
              <IconButton className='button button--alive icon-button'
                icon='cross'
                onClick={onCloseClick}
                text='Close' />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default withState(Modal)
