import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Topbar = () => {
  //for changing nav links according to the page
  const path = window.location.pathname;
  const activeLink =
    'text-sm font-medium text-white w-24 rounded-xl bg-stone-800';
  const notActiveLink = 'text-sm font-medium w-24';

  return (
    <div className='max-w-6xl mx-auto h-16 mb-8 mt-10'>
      <div className='w-full h-full mx-auto flex justify-between items-center border-b-2 p-2'>
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
            Item
          </button>
        </NavLink>

        <NavLink to='/dashboard/design'>
          <button
            className={
              path === '/dashboard/design' || path === '/dashboard/design/edit'
                ? activeLink
                : notActiveLink
            }
          >
            Design
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

        <NavLink to='/dashboard/marketing'>
          <button
            className={
              path === '/dashboard/marketing' ? activeLink : notActiveLink
            }
          >
            Marketing
          </button>
        </NavLink>

        <NavLink to='/dashboard/integrations'>
          <button
            className={
              path === '/dashboard/integrations' ? activeLink : notActiveLink
            }
          >
            Integrations
          </button>
        </NavLink>

        <NavLink to='/dashboard/other'>
          <button
            className={path === '/dashboard/other' ? activeLink : notActiveLink}
          >
            Config
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Topbar;
