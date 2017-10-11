import React from 'react'
import { Node as withState } from 'transactions-interface-state'

import ArrowButton from './ArrowButton'
import Tree from './Tree'

const Node = ({ isExpanded,
  maxStringLength,
  name,
  onExpandClick,
  stringTypes,
  value
}) => {
  const valueType = typeof value
  let valueElement
  if (valueType === null || stringTypes.includes(valueType)) {
    const stringValue = JSON.stringify(value)
    const maxStringLength = maxStringLength || 25
    const cutLength = Math.min(maxStringLength, stringValue.length)
    let cutStringValue = stringValue.slice(0, cutLength)
    if (cutLength === maxStringLength) {
      cutStringValue = `${cutStringValue}...`
    }
    return (
      <div className='node'>
        <div className='node__key node__key--string col'>
          { name }
        </div>
        <div className='col'>
          {cutStringValue}
        </div>
      </div>
    )
  } else if (Array.isArray(value)) {
    return (
      <div className='node'>
        <div className='node__key flex items-center'>
          <ArrowButton isExpanded={isExpanded}
            onExpandClick={onExpandClick} />
          <div className='node__key__name'>
            { name }
          </div>
        </div>
        <div>
          {
            isExpanded && value.map((element, arrayIndex) => <Tree json={{
                [arrayIndex]: element
              }}
              key={arrayIndex} />
            )
          }
        </div>
      </div>
    )
  } else {
    return (
      <div className='node'>
        <div className='node__key flex items-center'>
          <ArrowButton isExpanded={isExpanded}
            onExpandClick={onExpandClick} />
          <div className='node__key__name'>
            { name }
          </div>
        </div>
        { isExpanded && <Tree json={value} /> }
      </div>
    )
  }
}

Node.defaultProps = { maxStringLength: 25,
  stringTypes: ['boolean', 'number', 'string', 'undefined']
}

export default withState(Node)
