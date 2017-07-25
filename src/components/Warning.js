import React from 'react'
import { connect } from 'react-redux'
const { closeModal } = require('transactions-interface-state')

import Button from './Button'
import Icon from './Icon'

const Warning = ({ beforeCloseModal,
  closeModal,
  history,
  icon,
  isModalActive,
  text,
  nextLocation,
  subtext
}) => {
  return (<div className='warning'>
    <div className='warning__illustration'>
      <Icon icon={icon || 'exclamation'} className='warning__illustration__icon' />
    </div>
    <div className='warning__text'>
      {text}
    </div>
    <div className='warning__subtext'>
      {subtext}
    </div>
    {
      isModalActive && <div className='warning__modal'>
        {
          nextLocation
          ? (<div className='warning__modal__decision'>
            <Button
              className={`button warning__modal__decision__button`}
              onClick={closeModal}
            >
              No, cancel
            </Button>
            <Button
              className={`button warning__modal__decision__button`}
              onClick={() => {
                beforeCloseModal && beforeCloseModal()
                closeModal()
                history.push(nextLocation)
              }}
            >
              Yes, take me to the next page
            </Button>
          </div>)
          : (<Button
            className={`button warning__modal__decision__button`}
            onClick={() => {
              beforeCloseModal && beforeCloseModal()
              closeModal()
            }}
          >
            Ok
          </Button>)
        }
      </div>
    }
  </div>)
}

function mapStateToProps({
  modal: {
    beforeCloseModal,
    isActive
  }
}) {
  return { beforeCloseModal,
    isModalActive: isActive
  }
}
export default connect(mapStateToProps, {
  closeModal
})(Warning)
