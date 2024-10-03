//Splitting router into separate file
import { createBrowserRouter } from "react-router-dom";
import ProductDashboard from "./pages/ProductDashboard";
import ProductPage from "./pages/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProductDashboard></ProductDashboard>,
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
