import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import App from './components/App';
import './index.css';
import {UserProvider} from './components/context/user'
import {ErrorsProvider} from './components/context/errors'
import { GenresProvider } from './components/context/genres';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ErrorsProvider>
      <UserProvider>
        <GenresProvider>
          <App />
        </GenresProvider>
      </UserProvider>
    </ErrorsProvider>
  </BrowserRouter>
)