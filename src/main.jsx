import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
// import './index.css'
import ErrorBoundary from "./components/ErrorBoundary";



createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <App />
      </ErrorBoundary>
  </StrictMode>
);
