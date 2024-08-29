import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContextProvider  from './context/firebaseContext';
import UserContextProvider from './context/userContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FirebaseContextProvider>
    <UserContextProvider>
      <App />
    </UserContextProvider>
    </FirebaseContextProvider>
  </React.StrictMode>
);
