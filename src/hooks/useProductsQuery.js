import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchProductsInCategoryWithPagination } from "../services/services";

export const useProductsQuery = (filterCategory, current, pageSize, sorter) => {
  let order = ''
  if (sorter.columnKey === 'price') {
    if (sorter.order) {
      order = sorter.order === 'ascend' ? 'asc' : 'desc';
    }
  }

  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: [
      "products",
      filterCategory,
      current,
      pageSize,
      order
    ],
    queryFn: () =>
      fetchProducts(
        filterCategory,
        current,
        pageSize,
        order
      ),
    placeholderData: (previousData) => previousData,
    gcTime: 15 * 60 * 60,
    staleTime: 5 * 60 * 60,
  });
  return { data, isSuccess, isPending, error };
}