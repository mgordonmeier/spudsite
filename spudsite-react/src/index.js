import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import WanderingSpuddie from './components/WanderingSpuddie';

// Type check for root element
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </div>
);
