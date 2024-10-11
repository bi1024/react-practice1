import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../services/services";


export const useCategoriesQuery = () => {
  const { data, isSuccess, isPending, error } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    select:(data)=>{
      return data.map((category) =>
        ({ label: category.name, value: category.name })
      );
    },
    // initialData: [], //for not reading empty data
    gcTime: 15 * 60 * 60,
    staleTime: 5 * 60 * 60,
  });
  return { data, isSuccess, isPending, error };
}