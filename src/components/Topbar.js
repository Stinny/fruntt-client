import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import TopbarMobile from './TopbarMobile';
import { AiFillHome } from 'react-icons/ai';
import { BiPackage, BiMessageSquareDetail } from 'react-icons/bi';
import { BsPalette, BsBookmarkHeart, BsGear, BsPeople } from 'react-icons/bs';
import { MdOutlineShoppingCart } from 'react-icons/md';

const Topbar = () => {
  //for changing nav links according to the page
  const path = window.location.pathname;
  const activeLink =
    'text-sm h-6 font-medium text-white w-24 rounded bg-stone-800 flex items-center justify-center';
  const notActiveLink =
    'text-sm font-medium w-24 h-6 hover:bg-stone-800 hover:text-white rounded text-stone-800 flex items-center justify-center';

  return isMobile ? (
    <TopbarMobile />
  ) : (
    <div className='max-w-6xl mx-auto h-16 mb-8 mt-24'>
      <div className='w-full h-full mx-auto flex justify-between items-center border rounded bg-white drop-shadow-md p-2'>
        <NavLink to='/dashboard'>
          <button
            className={path === '/dashboard' ? activeLink : notActiveLink}
          >
            <AiFillHome className='mr-1' />
            Home
          </button>
        </NavLink>

        <NavLink to='/dashboard/item'>
          <button
            className={
              path === '/dashboard/item' ||
              path === '/dashboard/item/import' ||
              path.startsWith('/dashboard/item/edit') ||
              path === '/dashboard/item/digital'
                ? activeLink
                : notActiveLink
            }
          >
            <BiPackage className='mr-1' />
            Products
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
            <BsPalette className='mr-1' />
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
            <MdOutlineShoppingCart classsName='mr-1' />
            Orders
          </button>
        </NavLink>

        <NavLink to='/dashboard/reviews'>
          <button
            className={
              path === '/dashboard/reviews' ? activeLink : notActiveLink
            }
          >
            <BiMessageSquareDetail className='mr-1' />
            Reviews
          </button>
        </NavLink>

        <NavLink to='/dashboard/customers'>
          <button
            className={
              path === '/dashboard/customers' ? activeLink : notActiveLink
            }
          >
            <BsPeople className='mr-1' />
            Customers
          </button>
        </NavLink>

        <NavLink to='/dashboard/library'>
          <button
            className={
              path === '/dashboard/library' || path === '/dashboard/library'
                ? activeLink
                : notActiveLink
            }
            bookmark
          >
            <BsBookmarkHeart className='mr-1' />
            Library
          </button>
        </NavLink>

        <NavLink to='/dashboard/config'>
          <button
            className={
              path === '/dashboard/config' ? activeLink : notActiveLink
            }
          >
            <BsGear className='mr-1' />
            Config
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Topbar;
