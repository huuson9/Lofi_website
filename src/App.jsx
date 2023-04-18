import React, { useEffect, createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import { getUserAuth } from "./redux/actions";
import CloseTimeProvider from "../src/provider/CloseTimeProvider";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAuth());
  }, [dispatch]);

  return (
    <CloseTimeProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header /> <Home />
              </>
            }
          />
          <Route path="/login" element={<Login />} exact />
          <Route path="/about" element={<About />} exact />
        </Routes>
      </BrowserRouter>
    </CloseTimeProvider>
  );
}

export default App;
