import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state to indicate an error has occurred
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or perform other actions here
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can customize the error UI here
      return <div style={{color:'red',fontWeight:'bold'}}>Error occurred! Please try again.</div>;
    }

    // Render the wrapped components if no error has occurred
    return this.props.children;
  }
}

export default ErrorBoundary;
