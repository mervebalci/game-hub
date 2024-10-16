import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchResponse<T> {
  results: T[];
}

const useData = <T>(endpoint: string) => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sending a fetch request
  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const signal = controller.signal; // Get the signal to use for aborting

    setIsLoading(true);

    apiClient
      .get<FetchResponse<T>>(endpoint, { signal })
      .then((res) => {
        setData(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return; // Check for canceled request, otherwise there will be "canceled" message on top of the list of data.
        setError(err.message);
        setIsLoading(false);
      });

      // Cleanup function to abort the fetch request
      return () => controller.abort(); // Cancel the request on component unmount

  }, []);

  return { data, error, isLoading };
}

export default useData;