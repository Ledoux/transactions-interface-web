import React from 'react'

import Icon from './Icon'

const Confirmation = ({ subtitle,
  title
}) => {
  console.log('subtitle', subtitle, title)
  return (
    <div className='confirmation'>
      <div className='confirmation__illustration'>
        <Icon icon='confirmation'/>
      </div>
      <p className='confirmation__title'>
        { title || 'Thanks a lot for your help' }
      </p>
      <p className='confirmation__subtitle'>
        { subtitle || 'Your changes have been submitted' }
      </p>
    </div>
  )
}

export default Confirmation
