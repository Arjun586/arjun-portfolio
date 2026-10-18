import "@fontsource/bebas-neue";
import "@fontsource/oswald/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initThemeSync } from "./lib/theme";
import "./index.css";

initThemeSync();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);