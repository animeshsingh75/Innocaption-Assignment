import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "../features/product/Products";
import LoginPage from "../features/auth/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
