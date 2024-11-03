import useData from "./useData";
import genres from "../data/genres";

export interface Genre {
  id: number;
  name: string;
  image_background: string;
}

// Shipping a static data of genres to impact user experience
// const useGenres = () => ({ data: genres, isLoading: false, error: null });

// Fetching genres dynamically from API
const useGenres = () => useData<Genre>("/genres");

export default useGenres;