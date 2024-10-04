import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import './index.css'
import ErrorBoundary from "./components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
        {/* Commented out to Lighthouse */}
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>
);
