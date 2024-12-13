import { useRef, lazy } from "react";

import { Button, Flex, Space } from "antd";

import "../App.css";
import { addProduct } from "../services/services.js";

// import { filterCategoryReducer } from "../reducers.js";

import { memo } from "react";
import useStoreBase from "../store.js";

const ProductTable = lazy(() => import("../components/ProductTable.jsx"));
const ProductLayout = lazy(() => import("../layout/ProductLayout.jsx"));
const DropdownSelect = lazy(() => import("../components/DropdownSelect.jsx"));

function ProductDashboard() {
  let onModalSubmit = useRef(addProduct); //to persist between renders
  const openModal = useStoreBase.use.openModal();

  const ref = useRef(null);

  //hooks

  const handleAddProductClick = () => {
    onModalSubmit.current = addProduct;
    // setEditingProduct({});
    ref.current.setEditingProduct({});
    ref.current.setProductId("");
    openModal();
  };

  return (
    <>
      <ProductLayout>
        <Flex justify="flex-end">
          <Space>
            <DropdownSelect
            />
            <Button onClick={handleAddProductClick}>Add a product</Button>
          </Space>
        </Flex>

        <ProductTable ref={ref} onModalSubmit={onModalSubmit} />
      </ProductLayout>
    </>
  );
}

export default memo(ProductDashboard);
