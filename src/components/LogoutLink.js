import React from 'react'
import { connect } from 'react-redux'
const { closeModal,
  showModal
} = require('transactions-interface-state').default

import Button from './Button'
import Link from './Link'

const LogoutLink = ({ afterShowModal,
  className,
  closeModal,
  showModal,
  signPath
}) => {
  return (<Link className={className || 'logout-link'}
    onClick={() => {
      showModal(<div className='center'>
        <p className='mb2 h1'>
          Are you sure you want to log out ?
        </p>
        <div className='flex justify-center'>
          <div>
            <form method='post' action={`${signPath}/logout`}>
              <Button className='button button--alive mr2' type='submit'>
                Yes
              </Button>
            </form>
          </div>
          <div>
            <Button className='button button--alive' onClick={closeModal}>
              No
            </Button>
          </div>
        </div>
      </div>)
      afterShowModal && afterShowModal()
    }}
  >
    (logout)
  </Link>)
}

export default connect(null, { closeModal,
  showModal
})(LogoutLink)
