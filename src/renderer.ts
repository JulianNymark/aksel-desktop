import { Main } from "./components/Main";
import "./index.css";
import { createRoot } from "react-dom/client";

const root = createRoot(document.getElementById("react-root"));
root.render(Main());
