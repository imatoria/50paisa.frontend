import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Catalog from "./pages/Catalog";
import Upload from "./pages/Upload";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="" element={<Dashboard />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  );
};

export default AdminRoute;
