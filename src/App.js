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

import Register from './pages/Register';
import Login from './pages/Login';
import DashHome from './pages/Dashboard/DashHome';
import EditItem from './pages/Dashboard/EditItem';
import Integrations from './pages/Dashboard/Integrations';
import Orders from './pages/Dashboard/Orders';
import OrderDetail from './pages/Dashboard/OrderDetail';
import Customers from './pages/Dashboard/Customers';
import Design from './pages/Dashboard/Design';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import Marketing from './pages/Dashboard/Marketing';
import Plans from './pages/Plans';
import FreePlan from './pages/FreePlan';
import RequireSubscription from './RequireSubscription';
import PaidPlan from './pages/PaidPlan';
import Item from './pages/Dashboard/Item';
import AddItem from './pages/Dashboard/AddItem';
import EditDesign from './pages/Dashboard/EditDesign';

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
              <Route path='dashboard/plans/free' element={<FreePlan />} />
              <Route path='dashboard/plans/paid' element={<PaidPlan />} />

              {/* routes require user to be subscribed to a plan */}
              <Route element={<RequireSubscription />}>
                <Route path='settings' element={<Settings />} />

                <Route path='dashboard' element={<DashHome />} />

                <Route path='dashboard/item' element={<Item />} />

                <Route path='dashboard/orders' element={<Orders />} />

                <Route
                  path='dashboard/orders/:orderId'
                  element={<OrderDetail />}
                />

                <Route path='dashboard/customers' element={<Customers />} />

                <Route
                  path='dashboard/integrations'
                  element={<Integrations />}
                />

                <Route path='/dashboard/design' element={<Design />} />

                <Route path='/dashboard/design/edit' element={<EditDesign />} />

                <Route path='dashboard/marketing' element={<Marketing />} />

                <Route path='dashboard/item/add/buynow' element={<AddItem />} />

                <Route
                  path='dashboard/item/edit/:productId'
                  element={<EditItem />}
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
