import { useState } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { ToastProvider } from "./context/ToastContext.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastProvider>
          <Router />
        </ToastProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
