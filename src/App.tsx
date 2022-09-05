import React from "react";
import "./App.css";
import ButtonAppBar from "./components/AppBar";
import LabTabs from "./components/Tabs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ButtonAppBar />
        <br />
        <LabTabs/>
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
