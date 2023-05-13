import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import configureSkillStore from './store/skills.store.js';
import configureTagStore from './store/tags.store.js';

configureSkillStore();
configureTagStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
