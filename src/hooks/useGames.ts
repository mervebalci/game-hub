import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

export interface Platform {
  id: number;
  slug: string;
  name: string;
}

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[]; // Array of platform object
}

interface FetchGamesResponse {
  count: number;
  results: Game[];
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState("");

  // Sending a fetch request
  useEffect(() => {
    const controller = new AbortController(); // Create an AbortController instance
    const signal = controller.signal; // Get the signal to use for aborting

    apiClient
      .get<FetchGamesResponse>("/games", { signal })
      .then((res) => setGames(res.data.results))
      .catch((err) => {
        if (err instanceof CanceledError) return; // Check for canceled request, otherwise there will be "canceled" message on top of the list of games.
        setError(err.message)});

      // Cleanup function to abort the fetch request
      return () => controller.abort(); // Cancel the request on component unmount

  }, []);

  return { games, error };
}

export default useGames;