export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric); 

  fetch('/api/web-vitals', {
    method: 'POST',
    body: JSON.stringify(metric),
    headers: { 'Content-Type': 'application/json' },
  });
}

interface NextWebVitalsMetric {
  id: string;
  name: string;
  startTime: number;
  value: number;
  label: string;
}
