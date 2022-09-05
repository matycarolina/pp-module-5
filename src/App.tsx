import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ButtonAppBar from "./components/AppBar";
import LabTabs from "./components/Tabs";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <ButtonAppBar />
      </div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="info" element={<LabTabs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
