import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./scss/main.scss";
import { AppContextProvider } from "./context/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);
