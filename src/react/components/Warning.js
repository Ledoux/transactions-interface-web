import React from 'react'
import { Warning as withState } from 'transactions-interface-state'

import Button from './Button'
import Icon from './Icon'

const Warning = ({ closeModal,
  icon,
  isModalActive,
  isYesOrNo,
  nextLocation,
  onYesClick,
  text,
  push,
  subtext
}) => {
  return (
    <div className='warning'>
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
            isYesOrNo
            ? (
              <div className='warning__modal__decision'>
                <Button
                  className={`button warning__modal__decision__button`}
                  onClick={closeModal}
                >
                  No, cancel
                </Button>
                <Button
                  className={`button warning__modal__decision__button`}
                  onClick={onYesClick}
                >
                  Yes, take me to the next page
                </Button>
              </div>
            )
            : (
              <Button
                className={`button warning__modal__decision__button`}
                onClick={onYesClick}
              >
                Ok
              </Button>
            )
          }
        </div>
      }
    </div>
  )
}

export default withState(Warning)
