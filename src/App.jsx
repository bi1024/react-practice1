import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import "./App.css";

import { CategoryContext, ModalContext } from "./context.js";
import { useReducer } from "react";
import { filterCategoryReducer } from "./reducers.js";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, dispatch] = useReducer(filterCategoryReducer, "");
  return (
    <>
      <ModalContext.Provider
        value={{
          isModalOpen,
          setIsModalOpen,
        }}
      >
        <CategoryContext.Provider value={{ filterCategory, dispatch }}>
          <RouterProvider router={router} />
        </CategoryContext.Provider>
      </ModalContext.Provider>
      {/* <ProductDashboard></ProductDashboard> */}
    </>
  );
}

export default App;
