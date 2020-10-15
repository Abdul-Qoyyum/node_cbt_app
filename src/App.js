import React from 'react';
import {
    Timer,
    Pagination
     } from './components';

import './App.css';

function App() {
  return (
    <div className="App">
      <p>Hello from React </p>
      <Timer />
      <p> ---------- </p>
      <Pagination />
    </div>
  );
}

export default App;
