import React from 'react'

import Node from './Node'

const Tree = props => {
  const { json } = props
  return (
    <div className='tree'>
      {
        json && Object.keys(json)
          .map((key, index) => <Node index={index}
            key={index}
            name={key}
            value={json[key]} />
          )
      }
    </div>
  )
}

export default Tree
