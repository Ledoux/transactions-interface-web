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
        'col col-2': icon })}
      icon={icon} />)
    }
    <p className={classnames('title__text', {
      'col col-10 title__text--icon': icon})} >
      {text}
    </p>
  </div>)
}

export default Title
