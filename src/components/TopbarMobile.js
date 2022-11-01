import React from 'react';
import { NavLink } from 'react-router-dom';

const TopbarMobile = () => {
  const path = window.location.pathname;
  const activeLink =
    'text-sm font-medium text-white w-20 rounded-xl bg-slate-800 ml-2';
  const notActiveLink = 'text-sm w-20 font-medium text-slate-800 ml-2';

  return (
    <>
      <div className='w-full mx-auto h-16'>
        <div className='w-11/12 h-full mx-auto flex justify-between items-center border-b-2 p-2 overflow-x-scroll'>
          <NavLink to='/dashboard'>
            <button
              className={path === '/dashboard' ? activeLink : notActiveLink}
            >
              Home
            </button>
          </NavLink>

          <NavLink to='/dashboard/item'>
            <button
              className={
                path === '/dashboard/item' ||
                path === '/dashboard/item/add' ||
                path === '/dashboard/item/add/buynow'
                  ? activeLink
                  : notActiveLink
              }
            >
              Product
            </button>
          </NavLink>

          <NavLink to='/dashboard/design'>
            <button
              className={
                path === '/dashboard/design' ||
                path === '/dashboard/design/edit'
                  ? activeLink
                  : notActiveLink
              }
            >
              Design
            </button>
          </NavLink>

          <NavLink to='/dashboard/content'>
            <button
              className={
                path === '/dashboard/content' ? activeLink : notActiveLink
              }
            >
              Content
            </button>
          </NavLink>

          <NavLink to='/dashboard/orders'>
            <button
              className={
                path === '/dashboard/orders' ||
                path === '/dashboard/orders/:orderId'
                  ? activeLink
                  : notActiveLink
              }
            >
              Orders
            </button>
          </NavLink>

          <NavLink to='/dashboard/customers'>
            <button
              className={
                path === '/dashboard/customers' ? activeLink : notActiveLink
              }
            >
              Customers
            </button>
          </NavLink>

          {/* <NavLink to='/dashboard/marketing'>
            <button
              className={
                path === '/dashboard/marketing' ? activeLink : notActiveLink
              }
            >
              Marketing
            </button>
          </NavLink> */}

          <NavLink to='/dashboard/addons'>
            <button
              className={
                path === '/dashboard/addons' ? activeLink : notActiveLink
              }
            >
              Add-ons
            </button>
          </NavLink>

          <NavLink to='/dashboard/config'>
            <button
              className={
                path === '/dashboard/config' ? activeLink : notActiveLink
              }
            >
              Config
            </button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default TopbarMobile;
