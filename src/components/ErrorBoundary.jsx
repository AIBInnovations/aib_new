import { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorCount: 0 }
  }

  static getDerivedStateFromError(error) {
    // Silently recover from DOM manipulation errors during navigation
    if (error?.message?.includes('removeChild') || error?.name === 'NotFoundError') {
      return { hasError: false, error: null, errorCount: 0 }
    }
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // Suppress "removeChild" errors during navigation - these are expected during page transitions
    if (error?.message?.includes('removeChild') || error?.name === 'NotFoundError') {
      // Silently ignore these errors
      return
    }

    // Log other errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    // Reset error state when location changes
    if (this.state.hasError && prevState.hasError) {
      this.setState({ hasError: false, error: null, errorCount: 0 })
    }
  }

  render() {
    if (this.state.hasError) {
      // For non-DOM errors, show fallback UI
      return (
        <div style={{ padding: '20px', textAlign: 'center', color: '#fff' }}>
          <h2>Something went wrong</h2>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
