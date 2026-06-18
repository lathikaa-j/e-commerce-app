import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              borderRadius: "14px",
              background: "#fff",
              color: "#0f172a",
              boxShadow:
                "0 10px 25px rgba(0,0,0,0.08)",
            },
          }}
        />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);