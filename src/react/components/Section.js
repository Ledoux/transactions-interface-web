import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const Section = ({ beforeSection,
  children,
  extraClass,
  first,
  quilt
}) => {
  const classes = classnames({
    'section--first': first,
    'section--quilt': quilt
  }, 'section', extraClass)
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

Section.propTypes = { beforeSection: PropTypes.node,
  children: PropTypes.node.isRequired,
  extraClass: PropTypes.string,
  first: PropTypes.bool,
  quilt: PropTypes.bool
}

export default Section
