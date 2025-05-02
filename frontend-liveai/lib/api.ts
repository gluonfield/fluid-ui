type JsonBody = Record<string, unknown> | unknown[];

interface FetchOptions extends Omit<RequestInit, 'body'> {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: JsonBody;
}

export async function apiFetch(endpoint: string, options: FetchOptions = {}) {
  // Convert backend endpoints to Next.js API routes
  const apiEndpoint = endpoint.startsWith('/ui/components') 
    ? `/api${endpoint.substring(3)}` // Remove '/ui' prefix
    : endpoint;

  const headers = new Headers({
    'Accept': 'application/json',
    ...(options.headers as Record<string, string> || {})
  });

  if (options.body || options.method !== 'GET') {
    headers.set('Content-Type', 'application/json');
  }

  const config: RequestInit = {
    ...options,
    headers,
    body: options.body ? JSON.stringify(options.body) as BodyInit : null,
  };

  try {
    const response = await fetch(apiEndpoint, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Only try to parse JSON if there's content
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return null;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
} 