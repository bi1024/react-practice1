import React from "react";
import { memo } from "react";
import { Menu, Layout } from "antd";
const { Sider } = Layout;
import { ShopOutlined } from "@ant-design/icons";

const ProductSider = () => {
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
    label: `Products`,
  }));

  return (
    <Sider style={siderStyle}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={items}
      />
    </Sider>
  );
};

export default memo(ProductSider);
