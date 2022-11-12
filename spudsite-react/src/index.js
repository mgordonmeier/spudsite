import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import bg from './img/SpudsiteBg.jpg';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div style={{
    backgroundImage: "url(" + require( "./img/SpudsiteBg.jpg" ) + ")",
    backgroundSize: "cover",
    height: "auto"  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>
);
