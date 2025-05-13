import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import Spinner from './Spinner'

const SuspenseWrapper = ({
  children,
  fallback = <Spinner />,
}) => {
  return (
    <Suspense fallback={fallback}>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </Suspense>
  );
};

export default SuspenseWrapper;