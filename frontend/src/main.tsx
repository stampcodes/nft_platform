import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppKitProvider } from "./config/wagmi.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppKitProvider>
      <App />
    </AppKitProvider>
  </StrictMode>
);
