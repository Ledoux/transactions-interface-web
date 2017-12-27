import classnames from 'classnames'
import React from 'react'

import Icon from './Icon'

const Title = ({ className,
  extraClass,
  icon,
  text
}) => {
  return (
    <div className={classnames(className || 'title flex justify-start', {
      [extraClass]: extraClass
    })}>
      { icon && <Icon className='icon title__icon' icon={icon} /> }
      <div className='title__text'>
        {text}
      </div>
    </div>
  )
}

export default Title
