import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import background from "./img/pour4.JPG";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{
    backgroundImage: background,
    backgroundSize: "cover",
    height: 1300
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>
);
