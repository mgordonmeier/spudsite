import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WanderingSpuddie from './components/WanderingSpuddie';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div
    /*style={{
    backgroundImage: "url(" + require( "./img/SpudsiteBg2.jpg" ) + ")",
    backgroundSize: "cover",
    height: "auto", 
    position: 'relative' // Needed for absolute positioning of children
    }}*/
    >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>
);
