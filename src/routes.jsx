//Splitting router into separate file
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import ProductDashboard from "./pages/ProductDashboard.jsx";
import TestPage from "./pages/TestPage.jsx";
// import ProductPage from "./pages/ProductPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/products/" />,
  },
  {
    path: "products/",
    element: <ProductDashboard />,
  },
  {
    path: "testing/",
    element: <TestPage />,
  },
]);
export default router;
