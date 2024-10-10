import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProductsInCategoryWithPagination } from "../services/services";

export const useProductsQuery = (filterCategory, current, pageSize) => {
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: [
      "products",
      filterCategory,
      current,
      pageSize,
    ],
    queryFn: () =>
      fetchProductsInCategoryWithPagination(
        filterCategory,
        current,
        pageSize
      ),
    placeholderData: keepPreviousData,
    gcTime: 15 * 60 * 60,
    staleTime: 5 * 60 * 60,
  });
  return { data, isSuccess, isPending, error };
}