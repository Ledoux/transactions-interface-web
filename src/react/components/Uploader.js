import React from 'react'
import Dropzone from 'react-dropzone'
import { compose } from 'redux'
import { Uploader as withState } from 'transactions-interface-state'
import { withForcedProps } from 'transactions-redux-react'

const Uploader = ({ children,
  className,
  handleDropUpload
}) => {
  return (
    <Dropzone className={className || 'uploader'}
      multiple={false}
      accept="image/*"
      onDrop={handleDropUpload}>
      { children || <p>Drop an image or click to select a file to upload.</p> }
    </Dropzone>
  )
}

const hocs = []

if (typeof window !== 'undefined') {
  hocs.push(
    withForcedProps({
      fetch: window.fetch,
      revokeObjectURL: window.URL.revokeObjectURL
    })
  )
}
hocs.push(withState)

export default compose(...hocs)(Uploader)
