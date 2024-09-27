import { useState, useEffect, useMemo, useRef, useCallback, lazy } from "react";

import { Button, Layout, theme, Flex, Space } from "antd";
const { Header, Content, Footer } = Layout;

import "./App.css";

import ProductTable from "./components/ProductTable";
import DropdownSelect from "./components/DropdownSelect";
import ProductSider from "./components/ProductSider";
import ProductModal from "./components/ProductModal";

import { filterListByCategory, getCategories } from "./utils/productList";

import {
  fetchProducts,
  deleteProductById,
  editProduct,
  addProduct,
} from "./services/services";

function App() {
  const [toggle, setToggle] = useState(false); //to cause manual refetch
  const [filterCategory, setFilterCategory] = useState("");
  const [list, setList] = useState([]);
  const [editingProduct, setEditingProduct] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  let onModalSubmit = useRef(addProduct);
  let categories = getCategories(list);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //hooks
  useEffect(() => {
    const abortController = new AbortController();
    fetchProductData(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [toggle]);

  let filteredList = useMemo(
    () => filterListByCategory(list, filterCategory),
    [list, filterCategory]
  );

  //functions
  const fetchProductData = async (signal) => {
    const response = await fetchProducts(signal);
    setList(response);
  };

  const handleFilterChoice = (value) => {
    setFilterCategory(value);
  };

  const handleDelete = useCallback(
    (id) => {
      deleteProductById(id, toggle, setToggle);
    },
    [toggle]
  );

  const handleEdit = useCallback(
    (id) => {
      setEditingProduct(list.find((product) => product.id == id));
      // inputRef.current.focus();
      onModalSubmit.current = editProduct;
      setIsModalOpen(true);
    },
    [list]
  );

  const handleAddProductClick = () => {
    onModalSubmit.current = addProduct;
    setEditingProduct({});
    setIsModalOpen(true);
  };

  return (
    <>
      <ProductModal
        text="Add a product"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onSubmit={onModalSubmit.current}
        setToggle={setToggle}
        toggle={toggle}
        product={editingProduct}
      ></ProductModal>
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
