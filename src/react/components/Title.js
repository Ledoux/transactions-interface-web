import classnames from 'classnames'
import React from 'react'

import Icon from './Icon'

const Title = ({ className,
  icon,
  text
}) => {
  return (<div className={className || 'title'}>
    {
      icon && (<Icon
      className={classnames('icon title__icon', {
        'col col-1': icon })}
      icon={icon} />)
    }
    <p className={classnames('title__text', {
      'col col-11': icon})} >
      {text}
    </p>
  </div>)
}

export default Title
