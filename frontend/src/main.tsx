import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppKitProvider } from "./config/wagmi.tsx";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppKitProvider>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </AppKitProvider>
  </StrictMode>
);
