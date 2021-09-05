import { Component } from 'react'
import { withTranslation } from 'react-i18next'
import axios from 'axios'

import { ADVICE_APP } from '../../constants/routs'

import './index.scss'

class Advice extends Component {
  state = {
    advice: {}
  }

  componentDidMount() {
    axios(ADVICE_APP)
      .then(({ data }) => this.setState({ advice: data.slip }))
      .catch(error => console.log(error))
  }

  render() {
    const {
      advice: { advice, id }
    } = this.state

    return (
      <div className="advice">
        <h5 className="advice__title">{this.props.t('advice')}</h5>
        <p className="advice__text" key={id}>
          {advice}
        </p>
      </div>
    )
  }
}

export default withTranslation('translation')(Advice)
