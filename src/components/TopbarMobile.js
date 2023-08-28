import React from 'react';
import { NavLink } from 'react-router-dom';

const TopbarMobile = () => {
  const path = window.location.pathname;
  const activeLink =
    'text-sm font-medium text-white w-20 rounded-xl bg-stone-800 ml-2';
  const notActiveLink = 'text-sm w-20 font-medium text-stone-800 ml-2';

  return (
    <>
      <div className='w-full mx-auto h-14 pr-2 pl-2'>
        <div className='w-full h-full mx-auto flex justify-between items-center border rounded bg-white drop-shadow-md p-2 overflow-x-scroll mt-20'>
          <NavLink to='/dashboard'>
            <button
              autoFocus={path === '/dashboard'}
              className={path === '/dashboard' ? activeLink : notActiveLink}
            >
              Home
            </button>
          </NavLink>

          <NavLink to='/dashboard/item'>
            <button
              autoFocus={
                path === '/dashboard/item' || path === '/dashboard/item/digital'
              }
              className={
                path === '/dashboard/item' || path === '/dashboard/item/digital'
                  ? activeLink
                  : notActiveLink
              }
            >
              Products
            </button>
          </NavLink>

          {/* <NavLink to='/dashboard/content'>
            <button
              autoFocus={path === '/dashboard/content'}
              className={
                path === '/dashboard/content' ||
                path === '/dashboard/description'
                  ? activeLink
                  : notActiveLink
              }
            >
              Page
            </button>
          </NavLink> */}

          <NavLink to='/dashboard/design'>
            <button
              autoFocus={
                path === '/dashboard/design' ||
                path === '/dashboard/design/edit'
              }
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

          <NavLink to='/dashboard/orders'>
            <button
              autoFocus={path === '/dashboard/orders'}
              className={
                path === '/dashboard/orders' ? activeLink : notActiveLink
              }
            >
              Orders
            </button>
          </NavLink>

          <NavLink to='/dashboard/reviews'>
            <button
              autoFocus={path === '/dashboard/reviews'}
              className={
                path === '/dashboard/reviews' ? activeLink : notActiveLink
              }
            >
              Reviews
            </button>
          </NavLink>

          <NavLink to='/dashboard/library'>
            <button
              className={
                path === '/dashboard/library' || path === '/dashboard/library'
                  ? activeLink
                  : notActiveLink
              }
            >
              Library
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
              autoFocus={path === '/dashboard/addons'}
              className={
                path === '/dashboard/addons' ? activeLink : notActiveLink
              }
            >
              Add-ons
            </button>
          </NavLink>

          <NavLink to='/dashboard/config'>
            <button
              autoFocus={path === '/dashboard/config'}
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
