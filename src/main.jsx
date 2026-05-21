import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './providers/AuthProvider';
import router from './routes/Router';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontFamily: 'DM Sans, sans-serif',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          },
          success: {
            iconTheme: { primary: '#0ea5e9', secondary: 'white' },
          },
        }}
      />
    </AuthProvider>
  </React.StrictMode>
);
