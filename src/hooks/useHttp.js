import { useEffect, useState, useCallback } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong.");
  }
  const resData = await response.json();
  return resData;
}

export default function useHttp(url, config, initialData) {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "Something went wrong.");
      }
      setIsLoading(false);
    },
    [url, config]
  );
  // -- Check if it is a GET request
  useEffect(() => {
    // 1) Grab method, normalize to uppercase, default to "GET"
    const method = config?.method?.toUpperCase() || "GET";

    // 2) Fire only on GET
    if (method === "GET") {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}
