import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Berkas from "./component/berkas";
import ErrorPage from "./component/error";
import "./style/global.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router
      basename={
        process.env.NODE_ENV === "development" ? "/" : "/portal-laporan"
      }
    >
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/berkas" element={<Berkas />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
