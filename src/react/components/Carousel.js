import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import Slider from 'react-slick'

// TODO: allow to pass in and override the options
const sliderConfig = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  draggable: false,
  autoplaySpeed: 4000,
  cssEase: 'ease-out',
  pauseOnHover: true
}

// NOTE: Slider needs an extra wrapper div inside which we cannot attach layout to,
// because it conflicts with slick's layout classes (float etc)
class Carousel extends Component {
  constructor () {
    super()
    this.state = {
      initialized: false
    }
  }
  componentDidMount () {
    this.setState({initialized: true})
  }
  render () {
    const { extraClass,
      sliderOptions,
      slides,
      slideRenderFn
    } = this.props
    if (!slides || slides.length === 0) {
      console.warn('there is no slides in the Carousel')
      return null
    }
    const options = Object.assign({}, sliderConfig, {
      dots: slides.length > 1,
      autoplay: slides.length > 1
    }, sliderOptions)
    const classes = classnames({
      'carousel--initialized': this.state.initialized,
      'carousel--with-dots': options.dots
    }, extraClass, 'carousel')
    return (
      <div className={classes}>
        <Slider {...options}>
          {
            slides.map((slide, index) => (
              <div key={index}>
                { slideRenderFn(slide) }
              </div>
            ))
          }
        </Slider>
      </div>
    )
  }
}

Carousel.propTypes = { extraClass: PropTypes.string,
  slides: PropTypes.array.isRequired,
  slideRenderFn: PropTypes.func,
  sliderOptions: PropTypes.object
}

export default Carousel
