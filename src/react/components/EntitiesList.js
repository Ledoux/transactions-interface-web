import React  from 'react'
import { EntitiesList as withState } from 'transactions-interface-state'

import Tree from './Tree'

const EntitiesList = ({ collection,
  entities,
  warning
}) => {
  return (
    <div>
      { warning }
      -- see your entities! --
      {
        /*
        entities.map((document, index) => {
          const value = JSON.stringify(document, null, 2)
          const rows = value.split('\n').length + 1
          return (
            <div key={index}>
              {document.id}
              <textarea defaultValue={value}
                readOnly
                rows={rows}
                style={{resize: 'none', width: '100%' }} />
            </div>
          )
        })
        */
      }
      <Tree json={collection} />
    </div>
  )
}

export default withState(EntitiesList)
