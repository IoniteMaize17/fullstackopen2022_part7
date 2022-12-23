import { Button  } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

export const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div className='mb-3' style={hideWhenVisible}>
        <Button variant="primary" onClick={toggleVisibility}> {props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button className='mb-3' onClick={toggleVisibility} variant="secondary">Cancel</Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'
