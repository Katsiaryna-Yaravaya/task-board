import { Component } from 'react'
import { withTranslation } from 'react-i18next'

class ErrorBoundary extends Component {

  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return {
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo) {
    // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // Можно отрендерить запасной UI произвольного вида
      return <h1 className='errorBoundary'> {this.props.t('errorBoundary')} </h1>
    }
    return this.props.children
  }
}

export default withTranslation()(ErrorBoundary)