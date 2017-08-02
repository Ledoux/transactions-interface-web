import React, { Component } from 'react'
import { connect } from 'react-redux'

import ModeItem from './ModeItem'

class ModesList extends Component {
  constructor () {
    super()
    this.state = {
      text: null
    }
    this.handleMouseEnter = this._handleMouseEnter.bind(this)
    this.handleMouseExit = this._handleMouseExit.bind(this)
  }
  _handleMouseEnter (text) {
    this.setState({text})
  }
  _handleMouseExit (text) {
    this.setState({text: null})
  }
  render () {
    const {
      handleMouseEnter,
      handleMouseExit
    } = this
    const { iconMode,
      visibleModes
    } = this.props
    const {
      text
    } = this.state
    return (<div className='modes-list'>
      <p className='modes-list__title'>
        Choose the mode you want to turn into
      </p>
      <div className='modes-list__box'>
        <div className='modes-list__box__options col col-4'>
          {
            visibleModes.map((visibleMode, index) => {
              return (<div
                className='modes-list__box__options__item'
                key={index}
              >
                <ModeItem
                  handleMouseEnter={handleMouseEnter}
                  handleMouseExit={handleMouseExit}
                  index={index} {...visibleMode}
                  isList
                />
              </div>)
            })
          }
        </div>
        <div className='modes-list__box__info col col-8'>
          {
            text && (<p className='modes-list__box__info__text'>
              {text}
            </p>)
          }
        </div>
      </div>
    </div>)
  }
}

function mapStateToProps ({
  authorization: {
    modes
  }, mode}) {
  const specialModes = (modes && modes.filter(mode => mode.name !== 'guest')) || []
  return {
    iconMode: mode && mode.icon,
    visibleModes: (specialModes.length > 0 ? specialModes : modes) || []
  }
}
export default connect(mapStateToProps)(ModesList)
