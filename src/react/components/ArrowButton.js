import classnames from 'classnames'
import React from 'react'

const ArrowButton = ({ isExpanded,
  onExpandClick
}) => {
  return <button className={classnames('arrow-button', {
      'arrow-button--expanded': isExpanded})}
    onClick={onExpandClick} />
}

export default ArrowButton
