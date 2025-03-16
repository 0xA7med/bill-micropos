import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// استيراد CSS
import './styles/base.css';
import './styles/bill.css';
import './styles/form.css';
import './styles/print.css';
import './styles/responsive.css';
import './styles/index.css';
import './styles/components/bill-container.css';
import './styles/components/bill-field.css';
import './styles/components/form-controls.css';
import './styles/print/print-layout.css';
import './styles/print/print-components.css';
import './styles/variables.css';
console.log("Environment variables:", {
  API_KEY: import.meta.env.VITE_API_KEY,
  BACKUP_API_KEY: import.meta.env.VITE_BACKUP_API_KEY
});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);