import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import { Button, Section } from '../components'

const TwoColumnsSection = ({ buttonCta,
  label,
  imageSrc,
  isContentRight,
  isFullHeight,
  isLessThanMediumBrowser,
  subtitles,
  title
}) => {
  const contentElement = (
    <div key={0} className='two-columns-section__content md-col md-col-6 center p2 flex items-center justify-center overflow-hidden'>
      <div className='two-columns-section__content__container__title'>
        <div className={classnames('two-columns-section__content__container__title titlee ', {
            'flex items-center justify-center': isLessThanMediumBrowser })}>
          {title}
        </div>
        {
          subtitles && subtitles.map((subtitle, index) => (
            <div key={index} className='mb1 subtitle'>
              {subtitle}
            </div>
          ))
        }
        <div className='two-columns-section__content__container__button mb1'>
          <Button className='button button--alive'>
            {buttonCta}
          </Button>
        </div>
      </div>
    </div>
  )
  const illustrationElement = (
    <div key={1} className='two-columns-section__illustration md-col md-col-6 flex items-center justify-center'>
      <img className='two-columns-section__illustration__image' src={imageSrc} />
    </div>
  )
  return (
    <Section extraClass={classnames('two-columns-section mb2', {
        [`two-columns-section--${label}`]: label
      })}
      isFullHeight >
      {
        !isLessThanMediumBrowser && isContentRight
        ? [illustrationElement, contentElement]
        : [contentElement, illustrationElement]
      }
    </Section>
  )
}

export default connect(
  ({ browser: { lessThan: { medium } } }) => ({ isLessThanMediumBrowser: medium })
)(TwoColumnsSection)
