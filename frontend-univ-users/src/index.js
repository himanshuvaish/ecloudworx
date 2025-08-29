import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/globals.css';
import App from './App';

// Import the providers
import { AuthProvider } from './contexts/AuthContext';
import { ArticleProvider } from './contexts/ArticleContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Wrap App with AuthProvider and ArticleProvider */}
    <AuthProvider>
      <ArticleProvider>
        <App />
      </ArticleProvider>
    </AuthProvider>
  </React.StrictMode>
);
