import React from 'react'

import EditButton from './EditButton'
import SubmitButton from './SubmitButton'

const Control = ({ getFilteredElements,
  getIsEmptyForm,
  history,
  isEdit,
  isNew,
  requestTransactions
}) => {
  return (
    <div className='control flex flex-auto'>
      {
        (isEdit || isNew)
        ? <SubmitButton
          getFilteredElements={getFilteredElements}
          getIsEmptyForm={getIsEmptyForm}
          history={history}
          isEdit={isEdit}
          isNew={isNew}
          requestTransactions={requestTransactions}
        />
        : <EditButton history={history} />
      }
    </div>
  )
}

export default Control
