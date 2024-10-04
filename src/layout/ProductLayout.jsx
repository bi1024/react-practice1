import { lazy, memo } from "react";

import { Layout, theme } from "antd";
const { Header, Content, Footer } = Layout;

const ProductSider = lazy(() => import("../components/ProductSider.jsx"));

import { PropTypes } from "prop-types";

const ProductLayout = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
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
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          {/* Ant Design ©{new Date().getFullYear()} Created by Ant UED */}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default memo(ProductLayout);

ProductLayout.propTypes = {
  children: PropTypes.node,
};
