import React from "react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { fetchProducts, deleteProductById, editProduct } from "./services";
import {
  Layout,
  Menu,
  theme,
  Button,
  Switch,
  Space,
  Table,
  Tag,
  Select,
} from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { ShopOutlined } from "@ant-design/icons";

function App() {
  //em tạm thời chưa dùng json-server/mockapi
  const [filterCategory, setFilterCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [list, setList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);

  //react hook form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

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
    deleteProductById(id).then((data) => {
      console.log(data);
    });
  };

  const handleEdit = (id) => {
    const temp = list.find((product) => product.id == id);
    setValue("id", temp.id);
    setValue("title", temp.title);
    setValue("description", temp.description);
    setValue("category", temp.category);
    setValue("price", temp.price);
  };

  useEffect(() => {
    fetchProducts().then((data) => {
      setList(data);
      setFilteredList(data);
    });
  }, []);

  useEffect(() => {
    if (filterCategory && filterCategory.length != 0) {
      setFilteredList(list.filter((item) => item.category === filterCategory));
    } else {
      setFilteredList(list);
    }
  }, [filterCategory, list]);

  useEffect(() => {
    const tempCategories = [];
    list.forEach((product) => {
      if (tempCategories.indexOf(product.category) === -1) {
        tempCategories.push(product.category);
      }
    });
    setCategories(tempCategories);
  }, [list]);

  const siderStyle = {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "unset",
  };

  const items = [ShopOutlined].map((icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }));

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, product) => (
        <Space size="middle">
          <a
            onClick={() => {
              handleEdit(product.id);
            }}
          >
            Edit
          </a>
          <a
            onClick={() => {
              handleDelete(product.id);
            }}
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Layout
        hasSider
        style={{
          backgroundColor: "white",
          marginInlineStart: 200,
        }}
      >
        <Sider style={siderStyle}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={items}
          />
        </Sider>
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  readOnly
                  placeholder="id"
                  defaultValue=""
                  value={watch("id")}
                  {...register("id")}
                />
                {errors.title && <span>This field is required</span>}

                <input
                  placeholder="title"
                  {...register("title", { required: true })}
                />
                {errors.title && <span>This field is required</span>}

                <input
                  placeholder="description"
                  {...register("description", { required: true })}
                />
                {errors.description && <span>This field is required</span>}

                <input
                  placeholder="category"
                  {...register("category", { required: true })}
                />
                {errors.category && <span>This field is required</span>}

                <input
                  placeholder="price"
                  {...register("price", { required: true })}
                />
                {errors.price && <span>This field is required</span>}

                <input type="submit" />
              </form>

              {categories}
              <span>chosen: {filterCategory}</span>
              <select
                name="categories"
                id="categories"
                onChange={handleFilterChoice}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <span>Temporarily static value</span>
              <Select
                defaultValue=""
                style={{
                  width: 120,
                }}
                onChange={(value) => {
                  handleFilterChoice(value);
                }}
                options={[
                  {
                    value: "beauty",
                    label: "Beauty",
                  },
                  {
                    value: "fragrances",
                    label: "Fragrances",
                  },
                  {
                    value: "furniture",
                    label: "Furniture",
                  },
                  {
                    value: "groceries",
                    label: "Groceries",
                    // disabled: true,
                  },
                ]}
              />
              <Table columns={columns} dataSource={filteredList} />
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
