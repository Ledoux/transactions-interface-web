import React, { Component } from 'react'
import { IS_ALL_DEEP_JOINS,
  IS_ALL_JOINS,
  JOINS,
  LIMIT
} from 'transactions-redux-request'
import { Fetcher as withState } from 'transactions-interface-state'

import EntitiesList from './EntitiesList'

const Fetcher = ({ collectionNames,
  queryString,
  onCollectionNameChange,
  onQueryStringChange,
  selectedCollectionName
}) => {
  return (
    <div>
      <div>
        -- select a collection --
      </div>
      <select defaultValue={selectedCollectionName || ''}
        onChange={onCollectionNameChange} >
        <option key={collectionNames.length} disabled>

        </option>
        {
          collectionNames.map((collectionName, index) => (
            <option key={index} value={collectionName}>
              {collectionName}
            </option>
          ))
        }
      </select>
      <div>
        <div>
          -- write a query --
        </div>
        <textarea style={{ resize: 'none' }} onChange={onQueryStringChange}
          rows={queryString.split('\n').length + 1}
          value={queryString} />
      </div>
      { selectedCollectionName && <EntitiesList collectionName={selectedCollectionName}
        queryString={queryString} /> }
    </div>
  )
}

export default withState(Fetcher)
