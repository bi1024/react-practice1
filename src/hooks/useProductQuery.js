import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../services/services";

export const useProductQuery = (productId) => {
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    // placeholderData: keepPreviousData,
    gcTime: 15 * 60 * 60,
    staleTime: 5 * 60 * 60,
  });
  return { data, isSuccess, isPending, error }
}