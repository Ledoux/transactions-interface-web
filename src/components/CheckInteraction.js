import React from 'react'

import IconButton from './IconButton'

const CheckInteraction = ({ entityName,
  history,
  slug
}) => {
  return <IconButton
    className='button button--alive check-interaction'
    icon='pen'
    href={`/content/check/${entityName}/${slug}`}
  />
}

export default CheckInteraction
