import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const Section = ({ beforeSection,
  children,
  extraClass,
  isFullHeight
}) => {
  return (
    <section className={classnames('section', {
        'section--full-height': isFullHeight
      }, extraClass)}>
      <div className='section__inner'>
        {
          beforeSection && (
            <div className='section__inner__between-sections'>
              {beforeSection}
            </div>
          )
        }
        {children}
      </div>
    </section>
  )
}

Section.propTypes = { beforeSection: PropTypes.node,
  children: PropTypes.node.isRequired,
  extraClass: PropTypes.string
}

export default Section
