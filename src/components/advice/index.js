import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import axios from 'axios'

import "./index.scss"

class Advice extends Component {
  state = {
    advice: {}
  }

  componentDidMount() {
    axios('https://api.adviceslip.com/advice')
      .then((response) => this.setState({ advice: response.data.slip}))
      .catch((error) => console.log(error))
  }

  render() {
    return (
      <div className="advice">
        <h5 className="advice__title">{this.props.t('advice')}</h5>
        <p className="advice__text" key={this.state.advice.id}>{this.state.advice.advice}</p>
      </div>
    )
  }
}

const Extended = withTranslation()(Advice)
Extended.static = Advice.static

export default withTranslation() (Advice)