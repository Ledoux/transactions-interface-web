import React from 'react'
import { connect } from 'react-redux'
import { getNormalizerEntity } from 'transactions-redux-normalizer'

const Avatar = ({ className,
  imageUrl
}) => {
  return <img className={className || 'avatar'}
    src={imageUrl || '/static/images/user.png'}
  />
}

function mapStateToProps(state, { id, imageUrl }) {
  if (!imageUrl) {
    const user = getNormalizerEntity(state, 'users', id)
    return {
      imageUrl: user && user.imageUrl
    }
  }
  return {}
}
export default connect(mapStateToProps)(Avatar)
