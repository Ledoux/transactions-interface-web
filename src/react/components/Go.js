import React from 'react'
import { withRouter } from 'react-router'
import { Go as withState } from 'transactions-interface-state'

import IconButton from './IconButton'

const Go = ({ isBack,
  isForward,
  history,
  onBackClick,
  onForwardClick
}) => {
  return (
    <div>
      { history.length > 1 && <IconButton icon='chevron_left' onClick={onBackClick} /> }
      { history.action === 'POP' && <IconButton icon='chevron_right' onClick={onForwardClick} /> }
    </div>
  )
}

export default withRouter(withState(Go))
