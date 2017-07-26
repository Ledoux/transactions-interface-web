import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'

const Section = ({
  beforeSection,
  children,
  extraClass,
  first,
  quilt
}) => {
  const classes = classnames({
    'page-section--first': first,
    'page-section--quilt': quilt
  }, 'page-section', extraClass)
  return (
    <section className={classes}>
      <div className='page-section__inner'>
        {beforeSection &&
          <div className='page-section__between-sections'>
            {beforeSection}
          </div>
        }
        {children}
      </div>
    </section>
  )
}

Section.propTypes = {
  beforeSection: PropTypes.node,
  children: PropTypes.node.isRequired,
  extraClass: PropTypes.string,
  first: PropTypes.bool,
  quilt: PropTypes.bool
}

export default Section
