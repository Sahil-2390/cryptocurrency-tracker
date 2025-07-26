import React from 'react';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-header" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span className="crypto-icon" aria-label="crypto symbol" role="img" style={{ display: 'flex', alignItems: 'center' }}>
          {/* Simple crypto coin SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="orange" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="orange" strokeWidth="2" fill="none" />
            <text x="12" y="16" fontSize="16" fontWeight="bold" textAnchor="middle" fill="orange">₿</text>
          </svg>
        </span>
        Cryptocurrency Tracker
        <span className="tracker-icon" aria-label="graph logo" role="img" style={{ marginLeft: '8px', display: 'flex', alignItems: 'center' }}>
          {/* Simple graph SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="green" viewBox="0 0 24 24">
            <polyline points="3,17 8,12 13,16 18,10 21,13" stroke="green" strokeWidth="2" fill="none" />
            <circle cx="3" cy="17" r="2" fill="green" />
            <circle cx="8" cy="12" r="2" fill="green" />
            <circle cx="13" cy="16" r="2" fill="green" />
            <circle cx="18" cy="10" r="2" fill="green" />
            <circle cx="21" cy="13" r="2" fill="green" />
          </svg>
        </span>
      </h1>
      <Dashboard />
    </div>
  );
}

export default App;
