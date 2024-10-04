import {
  useState,
  useMemo,
  useRef,
  useCallback,
  useContext,
  useReducer,
  lazy,
} from "react";
import { useQuery } from "@tanstack/react-query";

import { Suspense } from "react";
import { Button, Flex, Space } from "antd";

import "../App.css";
import {
  deleteProductById,
  editProduct,
  addProduct,
  fetchProducts,
  fetchProductsInCategory,
} from "../services/services.js";
import { filterListByCategory } from "../utils/productList";
// import { filterCategoryReducer } from "../reducers.js";
import { CategoryContext, ModalContext } from "../context.js";
import { memo } from "react";

const ProductTable = lazy(() => import("../components/ProductTable.jsx"));
const ProductLayout = lazy(() => import("../layout/ProductLayout.jsx"));
const DropdownSelect = lazy(() => import("../components/DropdownSelect.jsx"));
const ProductModal = lazy(() => import("../components/ProductModal.jsx"));

function ProductDashboard() {
  const { filterCategory } = useContext(CategoryContext);
  const [editingProduct, setEditingProduct] = useState({});
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  let onModalSubmit = useRef(addProduct); //to persist between renders

  //hooks

  const { data } = useQuery({
    queryKey: ["products", filterCategory],
    queryFn: () => {
      return fetchProductsInCategory(filterCategory);
    },
    initialData: [], //for not reading empty data
  });
  // Todo - Change query for product modal so that it does not need to be fed data, ^ useQuery is currently only for the product modal

  // let filteredList = useMemo(
  //   () => filterListByCategory(data, filterCategory),
  //   [data, filterCategory]
  // );

  // const handleFilterChoice = useCallback((value) => {
  //   dispatch({
  //     type: "changed",
  //     filterCategory: value,
  //   });
  // }, []);

  const handleDelete = useCallback((id) => {
    deleteProductById(id);
  }, []);

  const handleEdit = useCallback(
    (id) => {
      setEditingProduct(data.find((product) => product.id == id));
      onModalSubmit.current = editProduct;
      setIsModalOpen(true);
    },
    [data, setIsModalOpen]
  );

  const handleAddProductClick = () => {
    onModalSubmit.current = addProduct;
    setEditingProduct({});
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Suspense>
          <ProductModal
            text="Add a product"
            onSubmit={onModalSubmit.current}
            product={editingProduct}
          ></ProductModal>
        </Suspense>
      )}

      <ProductLayout>
        <Flex justify="flex-end">
          <Space>
            <DropdownSelect
            // categories={categories}
            // handleFilterChoice={handleFilterChoice}
            />
            <Button onClick={handleAddProductClick}>Add a product</Button>
          </Space>
        </Flex>

        <ProductTable
          // data={data}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </ProductLayout>
    </>
  );
}

export default memo(ProductDashboard);
