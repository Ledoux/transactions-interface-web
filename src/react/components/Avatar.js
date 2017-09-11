import React from 'react'
import { Avatar as withState } from 'transactions-interface-state'

const Avatar = ({ className,
  imageUrl
}) => {
  return <img className={className || 'avatar'}
    src={imageUrl || '/static/images/user.png'} />
}

export default withState(Avatar)
