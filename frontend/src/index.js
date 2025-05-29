import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css';
//IMPORT GLOBAL STYLES

//CREATE A ROOT REFERENCE TO THE DIV WITH ID "root" IN index.html.



// RENDER THE MAIN APP COMPONENT INSIDE REACT STRICT MODE FOR BEST PRACTICE.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);