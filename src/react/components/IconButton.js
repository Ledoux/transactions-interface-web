import classnames from 'classnames'
import React from 'react'

import Button from './Button'
import Icon from './Icon'

const IconButton = props => {
  const { className,
    id,
    icon,
    text
  } = props
  return (
    <Button {...props}
    className={className || 'icon-button'}
    id={id} >
      <Icon
        className={classnames('icon-button__icon', {
          'col': text
        })}
        icon={icon}
      />
      <p className='icon-button__text col' >
        {text}
      </p>
    </Button>
  )
}

export default IconButton
