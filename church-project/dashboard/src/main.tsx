import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css"; 
import 'leaflet/dist/leaflet.css';
import "react-datepicker/dist/react-datepicker.css";
import App from "./App.tsx";
import "./i18n";
import { AuthProvider } from "./context/AuthContext"; 
import { ApiProvider } from "./context/ApiContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ApiProvider>
  </StrictMode>
);
