
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import AppRouter from './routes/router';
import store from './app/store';

import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
   
        <AppRouter />
   
    </Provider>
  </React.StrictMode>
);

