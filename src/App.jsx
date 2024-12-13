import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import "./App.css";

import { CategoryContext } from "./context.js";
import { useReducer } from "react";
import { filterCategoryReducer } from "./reducers.js";

function App() {
  const [filterCategory, dispatch] = useReducer(filterCategoryReducer, "");
  return (
    <>
        <CategoryContext.Provider value={{ filterCategory, dispatch }}>
          <RouterProvider router={router} />
        </CategoryContext.Provider>
      {/* <ProductDashboard></ProductDashboard> */}
    </>
  );
}

export default App;
