import useData from "./useData";
import platforms from "../data/platforms";

interface Platform {
  id: number;
  name: string;
  slug: string;
}

// Shipping a static data of platforms to impact user experience
const usePlatforms = () => ({ data: platforms, isLoading: false, error: null })

export default usePlatforms;