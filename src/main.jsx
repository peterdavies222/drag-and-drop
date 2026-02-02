import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./Attempt2.jsx";
import "./styles/master.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
