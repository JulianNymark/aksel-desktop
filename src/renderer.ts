import { createRoot } from "react-dom/client";
import { Main } from "./components/Main";
import "./index.css";
import { ElectronAPI } from "./preload";

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

const root = createRoot(document.getElementById("react-root"));
root.render(Main());
