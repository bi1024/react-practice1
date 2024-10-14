import React from "react";

import { memo } from "react";

import { Menu, Layout } from "antd";
const { Sider } = Layout;
import { ShopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ProductSider = () => {
  const navigate = useNavigate();
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
  const onSelect = (item) => {
    console.log(item);
    if (item.key === "i1") {
      navigate("/products");
    }
  };
  // const items = [ShopOutlined].map((icon, index) => ({
  //   key: String(index + 1),
  //   icon: React.createElement(icon),
  //   label: `Products`,
  // }));
  const items = [
    {
      key: "i1",
      icon: <ShopOutlined />,
      label: "Products",
    },
    {
      key: "i2",
      label: "Testing",
    },
  ];

  return (
    <Sider style={siderStyle}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["i1"]}
        items={items}
        onSelect={onSelect}
      />
    </Sider>
  );
};

export default memo(ProductSider);
