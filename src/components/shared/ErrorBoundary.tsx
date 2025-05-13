"use client";

import React from 'react';
import { AlertCircle, RefreshCw, Bug } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './AlertComponent';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      isExpanded: false 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleReload = () => {
    window.location.reload();
  };

  toggleErrorDetails = () => {
    this.setState(prev => ({ isExpanded: !prev.isExpanded }));
  };

  render() {
    if (this.state.hasError) {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const errorMessage = this.state.error?.message || 'An unexpected error occurred';
      const stackTrace = this.state.error?.stack;
      return (
        <div className="min-h-[300px] p-6 flex flex-col items-center justify-start space-y-6 animate-in fade-in duration-500">
          <Alert variant="destructive" className="w-full">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-red-100 dark:bg-red-900/20 rounded-full animate-ping" />
                <AlertCircle className="w-16 h-16 text-red-500 relative" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Something went wrong
              </h3>

              <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
                We apologize for the inconvenience. You can try refreshing the page or contact support if the problem persists.
              </p>
              {isDevelopment && (
                <div className="w-full">
                  <button
                    onClick={this.toggleErrorDetails}
                    className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                  >
                    <span className="flex items-center">
                      <Bug className="w-4 h-4 mr-2" />
                      Developer Details
                    </span>
                    <span className={`transform transition-transform ${this.state.isExpanded ? 'rotate-180' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {this.state.isExpanded && (
                    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-md overflow-auto max-h-[200px]">
                      <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {stackTrace}
                      </pre>
                    </div>
                  )}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  onClick={this.handleReset}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin-slow" />
                  Try Again
                </button>
                <button
                  onClick={this.handleReload}
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh Page
                </button>
              </div>
            </div>
          </div>
          {this.props.error && (
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              Error ID: {Math.random().toString(36).substr(2, 9)}
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;