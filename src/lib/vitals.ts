type WebVitalMetric = {
  id: string;
  name: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType?: string;
};

export function reportWebVitals(metric: WebVitalMetric) {
  if (process.env.APP_ENV !== 'production') {
    console.log(metric);
    return;
  }
  const body = {
    dsn: process.env.NEXT_PUBLIC_ANALYTICS_ID,
    id: metric.id,
    page: window.location.pathname,
    href: window.location.href,
    event_name: metric.name,
    value: metric.value.toString(),
    speed: 'connection' in navigator && 
    navigator.connection && 
   'effectiveType' in navigator.connection ? 
   (navigator.connection as any).effectiveType : '',
  };
  try {
    fetch('/api/vitals', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Failed to report web vital:', error);
  }
}