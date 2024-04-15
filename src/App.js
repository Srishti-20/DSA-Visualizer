// App.js
import React from 'react';
import './App.css';
import Bubble from './components/Bubble';

function App() {
  return (
    <div className="App">
      <div style={{textAlign: 'center'}}>
      <h1>Bubble Sort Visualizer</h1>
      </div >
      <Bubble />
    </div>
  );
}

export default App;
