import React from 'react'

import SubmitButton from './SubmitButton'

const Control = ({ getFilteredElements,
  getIsEmptyForm,
  history,
  requestTransactions
}) => {
  return (
    <div className='control flex flex-auto'>
      <SubmitButton
        getFilteredElements={getFilteredElements}
        getIsEmptyForm={getIsEmptyForm}
        history={history}
        requestTransactions={requestTransactions}
      />
    </div>
  )
}

export default Control
