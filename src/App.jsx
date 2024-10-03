import { useState } from "react";
import { Layout } from "antd";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import "./App.css";

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
