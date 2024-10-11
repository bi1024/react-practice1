import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchProductById } from "../services/services";
import ProductInfoPanel from "../components/ProductInfoPanel";
import { editProduct } from "../services/services";
import ProductLayout from "../layout/ProductLayout";

const ProductPage = () => {
  let { productId } = useParams();
  console.log(productId);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => {
      return fetchProductById(productId);
    },
  });
  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <ProductLayout>
      <ProductInfoPanel
        product={data}
        onSubmit={editProduct}
      ></ProductInfoPanel>
    </ProductLayout>
  );
};

export default ProductPage;
