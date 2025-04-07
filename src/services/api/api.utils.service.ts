type RequestConfig = {
  token?: string;
  idToken?: string;
  headers?: { [key: string]: string };
  method?: string;
  body?: string;
};

export async function fetchDataWithConfig({
  url,
  config = {},
  onUnauthorized,
}: {
  url: string;
  config: RequestConfig;
  onUnauthorized?: () => void;
}) {
  const { token, headers: customHeaders, ...customConfig } = config;

  const requestConfig: RequestConfig = {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
      ...customHeaders,
    },
    ...customConfig,
  };

  try {
    const res = await fetch(`${url}`, requestConfig);

    if (onUnauthorized && res.status === 401) {
      onUnauthorized();
      window.location.assign(window.location.toString());
      return Promise.reject({ message: 'Please re-authenticate' });
    }

    if (!res.ok) {
      throw new Error(`fetch error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
