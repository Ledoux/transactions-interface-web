import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

class Uploader extends Component {
  constructor () {
    super ()
    this.handleDropUpload = this._handleDropUpload.bind(this)
  }
  _handleDropUpload (files) {
    const { fileName,
      isOverride,
      isWithDate,
      onUpload
    } = this.props
    const uploadedFile = files[0]
    uploadedFile.test = 'blablabla'
    const localFormData = new FormData()
    localFormData.append('uploader', uploadedFile)
    let url = `/upload/${fileName || uploadedFile.name}`
    if (isWithDate) {
      const date = Date.now()
      url = `${url}-${date}`
    }
    if (isOverride) {
      url = `${url}?isOverride=true`
    }
    window.fetch(url, {
      body: localFormData,
      method: 'POST'
    }).then(result => result.json())
      .then(json => {
        if (onUpload) {
          onUpload(json)
        }
        window.URL.revokeObjectURL(uploadedFile.preview)
      })
  }
  render () {
    const { handleDropUpload } = this
    const { children,
      className
    } = this.props
    return (<Dropzone
      className={className || 'uploader'}
      multiple={false}
      accept="image/*"
      onDrop={handleDropUpload}>
      { children || <p>Drop an image or click to select a file to upload.</p> }
    </Dropzone>)
  }
}

export default Uploader
