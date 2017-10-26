import React from 'react'

import Icon from './Icon'

const Title = ({ className,
  icon,
  text
}) => {
  return (
    <div className={className || 'title flex justify-start'}>
      { icon && <Icon className='icon title__icon' icon={icon} /> }
      <p className='title__text'>
        {text}
      </p>
    </div>
  )
}

export default Title
