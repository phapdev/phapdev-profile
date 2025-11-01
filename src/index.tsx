import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <h1 className="text-red-500 border-l-0">HELLo PHAP DEV NE</h1>
    {/* <App /> */}
  </React.StrictMode>,
);
