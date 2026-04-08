import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./ui/App";
import "./styles/globals.css";
import "./styles/calculator.css";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("No #root element");
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
