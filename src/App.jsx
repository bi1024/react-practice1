import { useState, useMemo, useRef, useCallback, lazy } from "react";

import { Button, Layout, theme, Flex, Space } from "antd";
const { Header, Content, Footer } = Layout;

import "./App.css";

import ProductTable from "./components/ProductTable";
import DropdownSelect from "./components/DropdownSelect";
import ProductSider from "./components/ProductSider";
// import ProductModal from "./components/ProductModal.jsx";
const ProductModal = lazy(() => import("./components/ProductModal.jsx"));

import { filterListByCategory, getCategories } from "./utils/productList";

import {
  deleteProductById,
  editProduct,
  addProduct,
  fetchProducts,
} from "./services/services";
import { Suspense } from "react";
import { useQuery} from "@tanstack/react-query";

function App() {
  // const [toggle, setToggle] = useState(false); //to cause manual refetch
  const [filterCategory, setFilterCategory] = useState("");
  const [editingProduct, setEditingProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  let onModalSubmit = useRef(addProduct);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
    setFilterCategory(value);
  }, []);

  const handleDelete = useCallback(
    (id) => {
      deleteProductById(id);
    },
    []
  );

  const handleEdit = useCallback(
    (id) => {
      setEditingProduct(data.find((product) => product.id == id));
      onModalSubmit.current = editProduct;
      setIsModalOpen(true);
    },
    [data]
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

      <Layout
        hasSider
        style={{
          backgroundColor: "white",
          marginInlineStart: 200,
        }}
      >
        <ProductSider />
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <div
              style={{
                padding: 24,
                textAlign: "center",
                background: colorBgContainer,
              }}
            >
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
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default App;
