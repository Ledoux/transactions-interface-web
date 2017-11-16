import React from 'react'
import { InputButton as withState } from 'transactions-interface-state'

import Button from './Button'

const InputButton = ({
  cta,
  onButtonClick,
  onInputChange,
  placeholder,
  tag
}) => {
  return (
    <div className='input-button'>
      <input className='input-button__input mr1'
        onChange={onInputChange}
        placeholder={placeholder}
        {...tag ? { id: `input-button__input--${tag}` } : null }/>
      <Button className='button button--alive'
        onClick={onButtonClick}
        {...tag ? { id: `input-button__button--${tag}` } : null } >
        {cta}
      </Button>
    </div>
  )
}

export default withState(InputButton)
