import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import medReducer, { medsFetch } from './features/medSlice';
import { medsAPI } from './features/medsAPI';
import cartReducer from './features/cartSlice';

const store = configureStore({
  reducer: {
    meds: medReducer,
    cart : cartReducer,
    [medsAPI.reducerPath]: medsAPI.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(medsAPI.middleware);
  }
});

store.dispatch(medsFetch());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
