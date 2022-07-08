import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { productsApiSlice } from './api/productsApiSlice';
import { ordersApiSlice } from './api/ordersApiSlice';
import { authApiSlice } from './api/authApiSlice';
import { customersApiSlice } from './api/customersApiSlice';

store.dispatch(productsApiSlice.endpoints.getProducts.initiate());
store.dispatch(productsApiSlice.endpoints.getProduct.initiate());
store.dispatch(ordersApiSlice.endpoints.getStoreOrders.initiate());
store.dispatch(authApiSlice.endpoints.getUpdatedUser.initiate());
store.dispatch(authApiSlice.endpoints.getOnboardUrl.initiate());
store.dispatch(customersApiSlice.endpoints.getCustomers.initiate());

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
