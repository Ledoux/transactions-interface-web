import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import { Button, Icon, Section } from '../components'

const TwoColumnsSection = ({ browser,
  bubblesType,
  cta,
  element,
  label,
  href,
  icon,
  imageSrc,
  isContentRight,
  isFullHeight,
  isGreaterThanMediumBrowser,
  subtitles,
  title
}) => {
  const contentElement = (
    <div key={0} className='two-columns-section__content md-col md-col-6 center flex items-center justify-center overflow-hidden'>
      <div className='two-columns-section__content__container'>
        <div className={classnames('two-columns-section__content__container__title', {
            'flex items-center justify-center': !isGreaterThanMediumBrowser })}>
          {title}
        </div>
        <div className='two-columns-section__content__container__subtitles'>
          {
            subtitles && subtitles.map((subtitle, index) => (
              <div key={index} className='two-columns-section__content__container__subtitles__item'>
                {subtitle}
              </div>
            ))
          }
        </div>
        {
          cta && (
            <div className='two-columns-section__content__container__button'>
              <Button className='button button--alive'
                disabled={!href}
                href={href} >
                {cta}
              </Button>
            </div>
          )
        }
      </div>
    </div>
  )
  const illustrationElement = (
    <div key={1}
      className='two-columns-section__illustration md-col md-col-6 flex items-center justify-center'>
      { bubblesType && <Icon className={`two-columns-section__illustration__bubbles
        two-columns-section__illustration__bubbles--${bubblesType}`}
        icon={`bubbles_${bubblesType}`} /> }
      {
        imageSrc
        ? <img className='two-columns-section__illustration__image' src={imageSrc} />
        : (
          icon
          ? <Icon className='two-columns-section__illustration__icon' icon={icon} />
          : element
        )
      }
    </div>
  )
  return (
    <Section extraClass={classnames('two-columns-section', {
        [`two-columns-section--${label}`]: label
      })}
      isFullHeight={isGreaterThanMediumBrowser}>
      {
        isGreaterThanMediumBrowser && isContentRight
        ? [illustrationElement, contentElement]
        : [contentElement, illustrationElement]
      }
    </Section>
  )
}

export default connect(
  ({ browser: { greaterThan: { medium } } }) =>
    ({ isGreaterThanMediumBrowser: medium })
)(TwoColumnsSection)
