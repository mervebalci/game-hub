import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Genre {
  id: number;
  name: string;
}

interface FetchGenresResponse {
  count: number;
  results: Genre[];
}

const useGenres = () => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Sending a fetch request
  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const signal = controller.signal; // Get the signal to use for aborting

    setIsLoading(true);

    apiClient
      .get<FetchGenresResponse>("/genres", { signal })
      .then((res) => {
        setGenres(res.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return; // Check for canceled request, otherwise there will be "canceled" message on top of the list of genres.
        setError(err.message);
        setIsLoading(false);
      });

      // Cleanup function to abort the fetch request
      return () => controller.abort(); // Cancel the request on component unmount

  }, []);

  return { genres, error, isLoading };
}

export default useGenres;