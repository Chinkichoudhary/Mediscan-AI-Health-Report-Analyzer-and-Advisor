// frontend/src/index.js
//import React from "react";
//import { createRoot } from "react-dom/client";
//import App from "./App.css";
//import "./styles.css";

//const container = document.getElementById("root");
//const root = createRoot(container);
//root.render(<App />);
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
