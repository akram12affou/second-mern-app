import React from "react";
import ReactDOM from "react-dom/client";
import './main.css'
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SavedPosts from "./pages/SavedPosts.jsx";
import Auth from "./pages/Auth";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <Navbar />
    <Routes>
      <Route element={<Home />} path="/"></Route>
      <Route element={<Auth />} path="/auth"></Route>
      <Route element={<SavedPosts />} path="/saved-recipes"></Route>
      
    </Routes>
  </BrowserRouter>
);
