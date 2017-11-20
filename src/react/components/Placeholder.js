import React from 'react'

const Placeholder = ({ children }) => {
  return (
    <div className='placeholder'>
      <div className='placeholder__item'>
        <div className='placeholder__item__background'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Placeholder
