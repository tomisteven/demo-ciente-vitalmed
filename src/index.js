import React from "react";
import ReactDOM from "react-dom/client";
import 'sweetalert2/src/sweetalert2.scss'

import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

reportWebVitals();

const arr = [1, 2, 3, 4, 5];


//como verificosi un objeto esta vacio
function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
