import { useState, useMemo, useRef, useCallback, lazy } from "react";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button, Flex, Space } from "antd";

import "../App.css";

import ProductTable from "../components/ProductTable.jsx";
import DropdownSelect from "../components/DropdownSelect.jsx";
import ProductLayout from "../layout/ProductLayout.jsx";
const ProductModal = lazy(() => import("../components/ProductModal.jsx"));

import { filterListByCategory, getCategories } from "../utils/productList";

import {
  deleteProductById,
  editProduct,
  addProduct,
  fetchProducts,
} from "../services/services.js";
import { ModalContext } from "../context.js";
import { useContext } from "react";
import { filterCategoryReducer } from "../reducers.js";
import { useReducer } from "react";

function ProductDashboard() {
  // const [filterCategory, setFilterCategory] = useState("");
  const [filterCategory, dispatch] = useReducer(filterCategoryReducer, "");
  const [editingProduct, setEditingProduct] = useState({});
  const { isModalOpen, setIsModalOpen } = useContext(ModalContext);

  let onModalSubmit = useRef(addProduct); //to persist between renders



  //hooks

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialData: [], //for not reading empty data
  });

  let filteredList = useMemo(
    () => filterListByCategory(data, filterCategory),
    [data, filterCategory]
  );

  let categories = useMemo(() => {
    return getCategories(data);
  }, [data]);

  const handleFilterChoice = useCallback((value) => {
    // setFilterCategory(value);
    dispatch({
      type: "changed",
      filterCategory: value,
    });
  }, []);

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
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            onSubmit={onModalSubmit.current}
            product={editingProduct}
          ></ProductModal>
        </Suspense>
      )}

      <ProductLayout>
        <Flex justify="flex-end">
          <Space>
            <DropdownSelect
              categories={categories}
              handleFilterChoice={handleFilterChoice}
            />
            <Button onClick={handleAddProductClick}>Add a product</Button>
          </Space>
        </Flex>

        <ProductTable
          data={filteredList}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </ProductLayout>
    </>
  );
}

export default ProductDashboard;
