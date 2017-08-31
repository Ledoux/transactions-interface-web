import React from 'react'
import { connect } from 'react-redux'

const Loading = ({ isActive }) => {
  return (<div className='loading'>
    {
      isActive && <div className='loading__container' />
    }
  </div>)
}

function mapStateToProps ({
  loading: {
    isActive
  }
}) {
  return {
    isActive
  }
}
export default connect(mapStateToProps)(Loading)
