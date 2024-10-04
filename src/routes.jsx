//Splitting router into separate file
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProductDashboard = lazy(() => import("./pages/ProductDashboard.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
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
    path: "products/:productId",
    element: <ProductPage />,
  },
]);
export default router;

//   <Route path="/home" element={<HomePage />}></Route>
//   <Route path="/signup" element={<SignUpPage />}></Route>
//   <Route path="/forgot" element={<ForgotPasswordPage />}></Route>
//   <Route path="/admin" element={<AdminPage />}></Route>
