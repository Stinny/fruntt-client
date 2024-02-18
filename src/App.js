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
import Orders from './pages/Dashboard/Orders';
import OrderDetail from './pages/Dashboard/OrderDetail';
import Reviews from './pages/Dashboard/Reviews';
import Design from './pages/Dashboard/Design';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Pricing from './pages/Pricing';
import Marketing from './pages/Dashboard/Marketing';
import Plans from './pages/Plans';
import FreePlan from './pages/FreePlan';
import UserHasNoPage from './UserHasNoPage';
import PaidPlan from './pages/PaidPlan';
import Products from './pages/Dashboard/Products';
import EditDesign from './pages/Dashboard/EditDesign';
import ConfirmEmail from './pages/ConfirmEmail';
import DesignPreview from './pages/DesignPreview';
import Content from './pages/Dashboard/Content';
import Launching from './pages/Launching';
import PaymentMethod from './pages/PaymentMethod';
import CustomerDetail from './pages/Dashboard/CustomerDetail';
import Config from './pages/Dashboard/Config';
import Feedback from './pages/Feedback';
import AddPage from './pages/AddPage';
import AddDigitalProd from './pages/Dashboard/AddDigitalProd';
import Download from './pages/Download';
import Description from './pages/Dashboard/Description';
import PasswordReset from './pages/PasswordReset';
import RequestReset from './pages/RequestReset';
import TwitterAuth from './pages/TwitterAuth';
import Privacy from './pages/Privacy';
import NoStore from './pages/NoStore';
import TOS from './pages/TOS';
import 'normalize.css';
import { ToastContainer } from 'react-toastify';
import Marketplace from './pages/Marketplace';
import Library from './pages/Dashboard/Library';
import Customers from './pages/Dashboard/Customers';
import PasswordChange from './pages/PasswordChange';
import NotFound from './pages/NotFound';
import EditProfile from './pages/EditProfile';
import NameChange from './pages/NameChange';
import AddBank from './pages/AddBank';
import Contact from './pages/Contact';

function App() {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path='/' element={<NoAuth />}>
            <Route path='*' element={<NotFound />} />

            <Route index element={<Home />} />

            <Route path='privacy' element={<Privacy />} />

            <Route path='tos' element={<TOS />} />

            <Route path='contact' element={<Contact />} />

            <Route path='pricing' element={<Pricing />} />

            <Route path='login' element={<Login />} />

            <Route path='signup' element={<Register />} />

            <Route path='marketplace' element={<Marketplace />} />

            <Route path='auth/twitter' element={<TwitterAuth />} />

            <Route path='order/:orderId' element={<Download />} />

            <Route path='reset/password' element={<RequestReset />} />

            <Route path='password/reset/:token' element={<PasswordReset />} />

            {/* routes require user to be logged in */}
            <Route element={<RequireAuth />}>
              <Route path='home' element={<NoStore />} />
              <Route element={<UserHasNoPage />}>
                <Route path='dashboard' element={<DashHome />} />

                <Route path='dashboard/item' element={<Products />} />

                <Route path='dashboard/orders' element={<Orders />} />

                <Route path='dashboard/description' element={<Description />} />

                <Route
                  path='dashboard/edit/profile'
                  element={<EditProfile />}
                />

                <Route
                  path='dashboard/password/change'
                  element={<PasswordChange />}
                />

                <Route path='dashboard/name/change' element={<NameChange />} />

                <Route path='dashboard/bank' element={<AddBank />} />

                <Route
                  path='dashboard/orders/:orderId'
                  element={<OrderDetail />}
                />

                <Route path='dashboard/reviews' element={<Reviews />} />

                <Route
                  path='dashboard/reviews/:reviewId'
                  element={<CustomerDetail />}
                />

                <Route path='dashboard/customers' element={<Customers />} />

                <Route path='dashboard/config' element={<Config />} />

                <Route path='dashboard/design' element={<Design />} />

                <Route path='dashboard/content' element={<Content />} />

                <Route path='dashboard/library' element={<Library />} />

                <Route path='dashboard/design/edit' element={<EditDesign />} />

                <Route
                  path='dashboard/design/edit/preview'
                  element={<DesignPreview />}
                />

                <Route
                  path='dashboard/item/digital'
                  element={<AddDigitalProd />}
                />

                <Route
                  path='dashboard/item/edit/:productId'
                  element={<EditItem />}
                />
              </Route>
              <Route path='dashboard/plans' element={<Plans />} />
              <Route path='dashboard/plans/free' element={<FreePlan />} />
              <Route path='dashboard/plans/paid' element={<PaidPlan />} />
              <Route path='confirm/:userId' element={<ConfirmEmail />} />
              <Route path='storefront/launching' element={<Launching />} />
              <Route path='addpayment' element={<PaymentMethod />} />
              <Route path='addpage' element={<AddPage />} />

              <Route path='settings' element={<Settings />} />

              <Route path='dashboard/marketing' element={<Marketing />} />

              <Route path='feedback/' element={<Feedback />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
