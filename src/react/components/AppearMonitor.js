import React from 'react'
import InViewMonitor from 'react-inview-monitor'

class AppearMonitor extends InViewMonitor {
  _handleScroll () {
    const yOffset = window.pageYOffset
    const { classNameOnScrollIntoView,
      childPropsOnScrollIntoView,
      classNameInitial
    } = this.props
    if (yOffset > this._scrollOutOffViewThreshold) {
      if (classNameOnScrollIntoView || childPropsOnScrollIntoView) {
        this.setState({ className: classNameOnScrollIntoView,
          childProps: childPropsOnScrollIntoView
        })
      }
    } else {
      this.setState({ className: classNameInitial })
    }
  }
}

export default AppearMonitor
