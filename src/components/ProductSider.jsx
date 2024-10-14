import React from "react";

import { memo } from "react";

import { Menu, Layout } from "antd";
const { Sider } = Layout;
import { ShopOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import useStoreBase from "../store";

const ProductSider = () => {
  const navigate = useNavigate();
  const selectedMenu = useStoreBase.use.selectedMenu();

  const changeMenu = useStoreBase.use.changeMenu();
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
    changeMenu(item);

    if (item.key === "i1") {
      navigate("/products/");
    } else {
      navigate("/testing");
    }
  };

  const items = [
    {
      key: "i1",
      icon: <ShopOutlined />,
      label: "Products",
    },
    {
      key: "i2",
      icon: <ShopOutlined />,
      label: "Testing",
    },
  ];

  return (
    <Sider style={siderStyle}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={selectedMenu}
        items={items}
        onSelect={onSelect}
      />
    </Sider>
  );
};

export default memo(ProductSider);
