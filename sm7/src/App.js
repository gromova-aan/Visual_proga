import React from 'react';
import Fruits from './components/Fruits';
import './App.css';

function App() {
  const renderHeader = (header) => ( //принимает header и возращает jsx
    <span>{header}</span>
  );

  return (
    <div className="app-container">
      <Fruits header="Fruits" renderHeader={renderHeader}>
        <ul>
          <li>Apple</li>
          <li>Banana</li>
          <li>Orange</li>
        </ul>
      </Fruits>
    </div>
  );
}

export default App;
