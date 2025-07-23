import { useEffect, useState, useCallback, useContext } from "react";
import TeamContext from "../context/TeamContext";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message || "Something went wrong.");
  }

  return resData;
}

export default function useHttp(url, config = {}) {
  const { tasks, setTasks } = useContext(TeamContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async function (bodyData) {
      setIsLoading(true);
      setError(null);

      try {
        const resData = await sendHttpRequest(url, {
          ...config,
          body: bodyData,
        });

        const method = (config.method || "GET").toUpperCase();

        if (method === "GET") {
          // GET: Replace tasks if different
          if (JSON.stringify(tasks) !== JSON.stringify(resData)) {
            setTasks(resData);
          }
        } else if (method === "POST") {
          // POST: Append new task
          const newTask = Array.isArray(resData) ? resData[0] : resData;

          setTasks((prev) => [...prev, newTask]);
        }

        return resData; // Return response data
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError(err.message);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [url, config, setTasks, tasks]
  );

  // Auto-fetch for GET requests
  useEffect(() => {
    const method = (config.method || "GET").toUpperCase();
    if (method === "GET") {
      console.log(55);
      sendRequest().catch((err) => console.error("Initial fetch error:", err));
    }
  }, [sendRequest, config, config.key]); // Include config.key for refresh

  return {
    tasks,
    isLoading,
    error,
    sendRequest,
  };
}
