import React from 'react'
import { Loading as withState } from 'transactions-interface-state'

const Loading = ({ className,
  isActive
}) => {
  return (
    <div className={className || 'loading'}>
      {
        isActive && <div className='loading__container' />
      }
    </div>
  )
}

export default withState(Loading)
