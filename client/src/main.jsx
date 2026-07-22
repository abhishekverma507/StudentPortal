import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App";

import { StudentProvider } from "./context/StudentContext";
import { FeeProvider } from "./context/FeeContext";

import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <StudentProvider>

      <FeeProvider>

        <App />

      </FeeProvider>

    </StudentProvider>

  </React.StrictMode>
);