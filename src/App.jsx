import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  fetchProducts,
  deleteProductById,
  editProduct,
} from "./services/services";
import { Layout, theme } from "antd";
const { Header, Content, Footer } = Layout;

import ProductTable from "./components/ProductTable";
import DropdownSelect from "./components/DropdownSelect";
import EditInput from "./components/EditInput";
import ProductSider from "./components/ProductSider";
import {
  filterListByCategory,
  getCategories,
  updateLocalList,
} from "./utils/productList";

function App() {
  const [filterCategory, setFilterCategory] = useState("");
  const [list, setList] = useState([]);
  const [editingProduct, setEditingProduct] = useState({});
  // const [unusedState, setUnusedState] = useState(false);
  let filteredList = useMemo(
    () => filterListByCategory(list, filterCategory),
    [list, filterCategory]
  );
  let categories = getCategories(list);
  const inputRef = useRef(null);

  useEffect(() => {
    //fetch list at start of render
    fetchProducts().then((data) => {
      setList(data);
    });
  }, []);

  const onSubmit = (data) => {
    editProduct(data);
    setList(updateLocalList(list, data));
  };

  const handleFilterChoice = (value) => {
    setFilterCategory(value);
  };
  const handleDelete = useCallback(
    (id) => {
      deleteProductById(id).then(() => {
        setList(list.filter((product) => product.id != id));
      });
    },
    [list]
  );
  const handleEdit = useCallback(
    (id) => {
      setEditingProduct(list.find((product) => product.id == id));
      inputRef.current.focus();
    },
    [list]
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
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
            {/* <Button onClick={() => setUnusedState(!unusedState)}>

              Test if useMemo works, fails if console.log()
            </Button> */}
            <div
              style={{
                padding: 24,
                textAlign: "center",
                background: colorBgContainer,
              }}
            >
              <EditInput
                onSubmit={onSubmit}
                product={editingProduct}
                ref={inputRef}
              />
              <DropdownSelect
                categories={categories}
                handleFilterChoice={handleFilterChoice}
              />
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
