import { PureComponent } from 'react'
import { withTranslation } from 'react-i18next'
import PropTypes from 'prop-types';

import './index.scss'

class Logout extends PureComponent {
  render() {
    return <button className='logout' onClick={this.props.path}>{this.props.t('logout')}</button>
  }
}

const Extended = withTranslation()(Logout)
Extended.static = Logout.static

Logout.propTypes = {
  path: PropTypes.func
};

export default withTranslation()(Logout)