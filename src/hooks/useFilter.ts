import { useUrl } from "@shopify/hydrogen";
import { SortKey } from "../constants/Sort";

export const useFilter = () => {
  const { searchParams } = useUrl();
  const sort = searchParams.get("sort") as SortKey | undefined;
  const minPrice = Number(searchParams.get("minPrice"));
  const maxPrice = Number(searchParams.get("maxPrice"));

  return {
    sort,
    minPrice,
    maxPrice,
  };
};
