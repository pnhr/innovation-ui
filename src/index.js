import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { getMSALInstance } from "./authConfig.js";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const msalInstance = getMSALInstance();
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App instance={msalInstance} />
        </BrowserRouter>
    </React.StrictMode>,
);
