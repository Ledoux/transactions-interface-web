import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import { Button, Icon, Section } from '../components'

const TwoColumnsSection = ({ browser,
  iconTag,
  iconType,
  buttonExtraClass,
  cta,
  element,
  extraClass,
  href,
  icon,
  imageSrc,
  isContentRight,
  isFullHeight,
  isSplit,
  subtitles,
  tag,
  title
}) => {
  const contentElement = (
    <div key={0} className='two-columns-section__content md-col md-col-6 center flex items-center justify-center overflow-hidden'>
      <div className='two-columns-section__content__container'>
        <div className={classnames('two-columns-section__content__container__title', {
            'flex items-center': !isSplit })}>
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
              <Button className={classnames('button button--alive', {
                [buttonExtraClass]: buttonExtraClass
              })}
                disabled={!href}
                id={`button--${tag}`}
                href={href}
              >
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
      { iconTag && <Icon className={`two-columns-section__illustration__icons
        two-columns-section__illustration__icons--${iconTag}`}
        icon={`${iconType}_${iconTag}`} /> }
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
        [`two-columns-section--${tag}`]: tag,
        [extraClass]: extraClass
      })}
      isFullHeight={isSplit}>
      {
        isSplit && isContentRight
        ? [illustrationElement, contentElement]
        : [contentElement, illustrationElement]
      }
    </Section>
  )
}

export default connect(
  ({ browser: { greaterThan: { medium, large } } }) =>
    ({
      isSplit: large
    })
)(TwoColumnsSection)
