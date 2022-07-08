import './App.css';
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';

import NoAuth from './NoAuth';
import RequireAuth from './RequireAuth';

import Products from './pages/Dashboard/Products';
import Register from './pages/Register';
import Login from './pages/Login';
import DashHome from './pages/Dashboard/DashHome';
import AddProduct from './pages/Dashboard/AddProduct';
import EditProduct from './pages/Dashboard/EditProduct';
import Integrations from './pages/Dashboard/Integrations';
import Orders from './pages/Dashboard/Orders';
import Customers from './pages/Dashboard/Customers';
import Customization from './pages/Dashboard/Customization';
import Emailing from './pages/Dashboard/Emailing';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import Newsletters from './pages/Dashboard/Newsletters';
import Marketing from './pages/Dashboard/Marketing';
import Plans from './pages/Plans';
import RequireSubscription from './RequireSubscription';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<NoAuth />}>
            <Route index element={<Home />} />

            <Route path='pricing' element={<Pricing />} />

            <Route path='login' element={<Login />} />

            <Route path='signup' element={<Register />} />

            {/* routes require user to be logged in */}
            <Route element={<RequireAuth />}>
              <Route path='dashboard/plans' element={<Plans />} />
              <Route element={<RequireSubscription />}>
                <Route path='settings' element={<Settings />} />

                <Route path='dashboard' element={<DashHome />} />

                <Route path='dashboard/products' element={<Products />} />

                <Route path='dashboard/orders' element={<Orders />} />

                <Route path='dashboard/customers' element={<Customers />} />

                <Route
                  path='dashboard/integrations'
                  element={<Integrations />}
                />

                <Route
                  path='/dashboard/customization'
                  element={<Customization />}
                />

                <Route path='dashboard/newsletters' element={<Newsletters />} />

                <Route path='dashboard/marketing' element={<Marketing />} />

                <Route path='dashboard/addproduct' element={<AddProduct />} />

                <Route
                  path='dashboard/product/edit/:productId'
                  element={<EditProduct />}
                />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
