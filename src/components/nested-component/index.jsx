import PropTypes from 'prop-types'
import classNames from 'classnames'

import './index.scss'

const NestedComponent = ({
  stringData,
  modified,
  updateNestedComponentState
}) => {
  return (
    <div
      className={classNames('nested-component', {
        'nested-component_modified': modified
      })}
      onClick={updateNestedComponentState}
    >
      {stringData}
    </div>
  )
}

export default NestedComponent

NestedComponent.propTypes = {
  stringData: PropTypes.string
}

NestedComponent.defaultProps = {
  stringData: 'defaultString'
}
