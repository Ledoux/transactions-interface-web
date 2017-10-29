import React from 'react'
import { InputButton as withState } from 'transactions-interface-state'

import Button from './Button'

const InputButton = ({
  cta,
  onButtonClick,
  onInputChange,
  placeholder
}) => {
  return (
    <div className='input-button'>
      <input className='input-button__input mr1'
        onChange={onInputChange}
        placeholder={placeholder} />
      <Button className='button button--alive' onClick={onButtonClick} >
        {cta}
      </Button>
    </div>
  )
}

export default withState(InputButton)
