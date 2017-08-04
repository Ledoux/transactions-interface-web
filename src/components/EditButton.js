import React from 'react'

import Button from './Button'
import Icon from './Icon'

const EditButton = ({ history }) => {
  return  (
    <Button
      className={`button button--alive edit-button`}
      onClick={() => {
        history.push(`${window.location.pathname}?isEdit=true`)
      }}
    >
      <Icon className='icon edit-button__icon' icon='pen' />
    </Button>
  )
}

export default EditButton
