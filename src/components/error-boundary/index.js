import { Component } from 'react'
import { withTranslation } from 'react-i18next'

class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true
    }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    const { t, children } = this.props

    // You can render any custom fallback UI
    return this.state.hasError ? (
      <h1 className="errorBoundary">{t('errorBoundary')}</h1>
    ) : (
      children
    )
  }
}

export default withTranslation('translation')(ErrorBoundary)
