import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import TopbarMobile from './TopbarMobile';

const Topbar = () => {
  //for changing nav links according to the page
  const path = window.location.pathname;
  const activeLink =
    'text-sm font-medium text-white w-24 rounded-xl bg-stone-800';
  const notActiveLink = 'text-sm font-medium w-24 text-stone-800';

  return isMobile ? (
    <TopbarMobile />
  ) : (
    <div className='max-w-6xl mx-auto h-16 mb-8 mt-24'>
      <div className='w-full h-full mx-auto flex justify-between items-center border rounded bg-white drop-shadow-md p-2'>
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
              path === '/dashboard/item/import' ||
              path === '/dashboard/item/add' ||
              path === '/dashboard/item/digital'
                ? activeLink
                : notActiveLink
            }
          >
            Product
          </button>
        </NavLink>

        <NavLink to='/dashboard/content'>
          <button
            className={
              path === '/dashboard/content' || path === '/dashboard/description'
                ? activeLink
                : notActiveLink
            }
          >
            Page
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

        <NavLink to='/dashboard/reviews'>
          <button
            className={
              path === '/dashboard/reviews' ? activeLink : notActiveLink
            }
          >
            Reviews
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
  );
};

export default Topbar;
