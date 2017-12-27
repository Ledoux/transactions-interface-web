import React from 'react'
import { Go as withState } from 'transactions-interface-state'

import IconButton from './IconButton'

const Go = ({ onBackClick,
  onForwardClick
}) => {
  return (
    <div>
      <IconButton icon='chevron_left' onClick={onBackClick} />
      <IconButton icon='chevron_right' onClick={onForwardClick} />
    </div>
  )
}

export default withState(Go)
