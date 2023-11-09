import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * En este componente se carga bootstrap y se renderiza el componente App
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

