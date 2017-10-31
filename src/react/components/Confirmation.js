import React from 'react'

import Icon from './Icon'

const Confirmation = ({ subtext,
  text
}) => {
  return (
    <div className='confirmation'>
      <div className='confirmation__illustration'>
        <Icon icon='confirmation'/>
      </div>
      <p className='confirmation__text'>
        { text || 'Thanks a lot for your help' }
      </p>
      <p className='confirmation__subtext'>
        { subtext || 'Your changes have been submitted' }
      </p>
    </div>
  )
}

export default Confirmation
