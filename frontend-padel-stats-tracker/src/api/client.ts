const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

type FetchOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

export const apiFetch = async <T>(path: string, options: FetchOptions = {}): Promise<T> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(errorText || `Request failed with status ${response.status}`);
    }

    const data = (await response.json().catch(() => ({}))) as T;
    return data;
  } catch (err) {
    console.error('apiFetch error:', err);
    throw err instanceof Error ? err : new Error('Unexpected error during fetch');
  }
};
