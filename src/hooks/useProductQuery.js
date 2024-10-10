import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProductById } from "../services/services";
export const useProductQuery = (productId) => {
  const queryClient = useQueryClient()
  console.log(queryClient)
  console.log(queryClient
    .getQueryData(["products"])
  )
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductById(productId),
    placeholderData: (previousData) => previousData,


    gcTime: 15 * 60 * 60,
    staleTime: 5 * 60 * 60,
  });
  return { data, isSuccess, isPending, error }
}