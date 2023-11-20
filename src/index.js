import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { PhotoContextProvider } from './context/PhotoContext';
import { ChatProvider } from './context/ChatContext';

import './index.css';
import App from './layout/App';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <AuthContextProvider>
    <PhotoContextProvider>
      <ChatProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatProvider>
    </PhotoContextProvider>
  </AuthContextProvider>
);
