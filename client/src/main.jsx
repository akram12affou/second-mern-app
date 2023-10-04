import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SavedPosts from "./pages/SavedPosts.jsx";
import Auth from "./pages/Auth";
import UpdateUser from "./pages/UpdateUser";
import { AuthContextProvider } from "./Context/Authcontext";
import { PostContextProvider } from "./Context/PostContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <PostContextProvider>
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route element={<Home />} path="/"></Route>
        <Route element={<Auth />} path="/auth"></Route>
        <Route element={<UpdateUser />} path="/update-user"></Route>
        <Route element={<SavedPosts />} path="/saved-recipes"></Route>
      </Routes>
    </AuthContextProvider>
    </PostContextProvider>
  </BrowserRouter>
);
