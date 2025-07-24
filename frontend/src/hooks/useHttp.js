import { useEffect, useState, useCallback, useContext } from "react";
import TeamContext from "../context/TeamContext";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  if (!response.ok) {
    let msg = `Error ${response.status}`;
    try {
      const errJson = await response.json();
      msg = errJson.message || msg;
    } catch {
      const text = await response.text();
      if (text) msg = text;
    }
    throw new Error(msg);
  }

  // Always JSON on 2xx here
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export default function useHttp(url, config = {}) {
  const { tasks, setTasks } = useContext(TeamContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (bodyData) => {
      setIsLoading(true);
      setError(null);

      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: bodyData,
        });

        const method = (config.method || "GET").toUpperCase();
        setTasks((prev) => {
          switch (method) {
            case "GET": {
              return resData || [];
            }
            case "POST": {
              const newTask = Array.isArray(resData) ? resData[0] : resData;
              return [...prev, newTask];
            }
            case "PUT":
              return prev.map((t) => (t.id === resData.id ? resData : t));
            case "DELETE": {
              const deletedId =
                resData && typeof resData === "object" ? resData.id : resData;
              return prev.filter((t) => t.id !== deletedId);
            }
            default:
              return prev;
          }
        });

        return resData;
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [url, config.method, setTasks]
  );

  useEffect(() => {
    if ((config.method || "GET").toUpperCase() === "GET") {
      sendRequest().catch(console.error);
    }
  }, [sendRequest, config.key]);

  return { tasks, isLoading, error, sendRequest };
}
