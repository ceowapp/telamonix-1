export  function sanitizeDataForClient(data) {
  if (!data) return data;
  if (Array.isArray(data)) {
    return data.map(sanitizeDataForClient);
  }
  if (typeof data === 'object' && data !== null) {
    if (data.buffer && typeof data.toJSON === 'function') {
      return {
        ...data,
        buffer: undefined,
        url: data.url || null,
      };
    }
    const sanitized = {};
    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeDataForClient(value);
    }
    return sanitized;
  }
  return data;
}