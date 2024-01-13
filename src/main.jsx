import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FeaturesContextProvider from "./context/FeaturesContextProvider.jsx";

import { UserContextProvider } from "./context/UserContextProvider.jsx";
import WebsiteContextProvider from "./context/WebsiteContextProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WebsiteContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <FeaturesContextProvider>
            <HelmetProvider>
              <ToastContainer autoClose={3000} rtl={false} theme="dark" />
              <QueryClientProvider client={queryClient}>
                <div className="bg-[#F7F7F7]">
                  <RouterProvider router={router} />
                </div>
              </QueryClientProvider>
            </HelmetProvider>
          </FeaturesContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </WebsiteContextProvider>
  </React.StrictMode>
);
