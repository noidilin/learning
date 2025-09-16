import { useCallback, useEffect, useState } from 'react';

// NOTE: extract not react concept code (fetch API) into separate function
async function sendHttpRequest(url, config) {
  const res = await fetch(url, config);
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.',
    );
  }
  return resData;
}

// NOTE: initialData prevent state being undefined before useEffect execute
function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  function clearData() {
    setData(initialData);
  }

  // NOTE: useCallback to avoid infinite loop
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        // NOTE: this allows data be passed as argument inside component
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong');
      }
      setIsLoading(false);
    },
    [url, config],
  );

  // NOTE: auto fetch GET request
  useEffect(() => {
    if (!config || (config && (config.method === 'GET' || !config.method)))
      sendRequest();
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest, // NOTE: for other manually request
    clearData,
  };
}

export default useHttp;
