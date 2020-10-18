import React from 'react';
import {
    Timer,
    Pagination
     } from './components';

import { RegisterPage } from "./pages";

import './App.css';

function App() {
  return (
    <div className="App">
      <p>Login</p>
      <Timer />
      <RegisterPage/>
      <p> ---------- </p>
      <Pagination />
    </div>
  );
}

export default App;
