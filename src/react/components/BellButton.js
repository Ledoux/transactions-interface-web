import classnames from 'classnames'
import React from 'react'
import { BellButton as withState } from 'transactions-interface-state'

import Button from './Button'
import Icon from './Icon'

const BellButton = ({ closeInformation,
  isEmpty,
  isInformationActive,
  isNewNotification,
  showInformation
}) => {
  const classes = classnames({
    'bell-button--inactivated': isEmpty
  }, 'bell-button')
  return (
    <Button className={classes}
      disabled={isEmpty}
      onClick={e => {
        e.preventDefault()
        if (!isInformationActive && !isEmpty) {
          showInformation()
        } else {
          // For keyboard users.
          // Not used for mouseclicks, instead we capture clicks via dismiss overlay
          closeInformation()
        }
      }}
    >
      <Icon
        className='bell-button__icon'
        icon='bell'
      />
      {
        isNewNotification && (<svg className='bell-button__alert'>
          <circle className='bell-button__alert__circle' />
        </svg>)
      }
    </Button>
  )
}

export default withState(BellButton)
