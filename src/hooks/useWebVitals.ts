import { useEffect } from 'react';
import * as webVitals from 'web-vitals';

export function useWebVitals(reportWebVitals) {
  useEffect(() => {
    if (process.env.APP_ENV !== 'production') {
      webVitals.onCLS((metric) => reportWebVitals(metric));
      webVitals.onFID((metric) => reportWebVitals(metric));
      webVitals.onFCP((metric) => reportWebVitals(metric));
      webVitals.onLCP((metric) => reportWebVitals(metric));
      webVitals.onTTFB((metric) => reportWebVitals(metric));
    }
  }, []);
}