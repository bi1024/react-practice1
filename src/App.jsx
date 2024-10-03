import { useState, useMemo, useRef, useCallback, lazy } from "react";
import { Button, Layout, theme, Flex, Space } from "antd";
const { Header, Content, Footer } = Layout;
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import "./App.css";

import ProductDashboard from "./pages/ProductDashboard.jsx";
import { ModalContext } from "./context.js";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ModalContext.Provider
        value={{
          isModalOpen,
          setIsModalOpen,
        }}
      >
        <RouterProvider router={router} />
      </ModalContext.Provider>
      {/* <ProductDashboard></ProductDashboard> */}
    </>
  );
}

export default App;
