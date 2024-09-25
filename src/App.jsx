import { useState, useEffect } from "react";
import { fetchProducts, deleteProductById, editProduct } from "./services";
import { Layout, theme } from "antd";
const { Header, Content, Footer,  } = Layout;
import ProductTable from "./components/ProductTable";
import DropdownSelect from "./components/DropdownSelect";
import EditInput from "./components/EditInput";
import ProductSider from "./components/ProductSider";

function App() {
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [editingProduct, setEditingProduct] = useState({});


  const onSubmit = (data) => {
    editProduct(data);
    setList(
      list.map((product) =>
        product.id == data.id
          ? {
              ...product,
              title: data.title,
              description: data.description,
              category: data.category,
              price: data.price,
            }
          : product
      )
    );
  };

  const handleFilterChoice = (value) => {
    console.log("changed");
    setFilterCategory(value);
  };

  const handleDelete = (id) => {
    deleteProductById(id).then(() => {
      setList(list.filter((product) => product.id != id));
    });
  };

  const handleEdit = (id) => {
    const temp = list.find((product) => product.id == id);
    setEditingProduct(temp);
  };

  useEffect(() => {
    fetchProducts().then((data) => {
      setList(data);
    });
  }, []);

  useEffect(() => {
    const tempCategories = [];
    list.forEach((product) => {
      if (tempCategories.indexOf(product.category) === -1) {
        tempCategories.push(product.category);
      }
    });

    setCategories(tempCategories);
  }, [list]);

  useEffect(() => {
    console.log(list);
    console.log(filteredList);
  });
  useEffect(() => {
    if (filterCategory && filterCategory.length != 0) {
      setFilteredList(list.filter((item) => item.category === filterCategory));
    } else {
      setFilteredList(list);
    }
  }, [filterCategory, list]);

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
            <div
              style={{
                padding: 24,
                textAlign: "center",
                background: colorBgContainer,
                // borderRadius: borderRadiusLG,
              }}
            >
              <EditInput onSubmit={onSubmit} product={editingProduct} />
              <span>chosen: {filterCategory}</span>
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
