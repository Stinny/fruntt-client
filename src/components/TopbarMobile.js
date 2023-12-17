import React from 'react';
import { NavLink } from 'react-router-dom';
import { AiFillHome } from 'react-icons/ai';
import { BiPackage, BiMessageSquareDetail } from 'react-icons/bi';
import { BsPalette, BsBookmarkHeart, BsGear, BsPeople } from 'react-icons/bs';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { HiOutlineTemplate } from 'react-icons/hi';

const TopbarMobile = () => {
  const path = window.location.pathname;
  const activeLink =
    'text-xs font-medium text-white w-20 h-6 rounded bg-stone-800 ml-2 flex items-center justify-center';
  const notActiveLink =
    'text-xs w-20 font-medium text-stone-800 ml-2 flex items-center justify-center';

  return (
    <>
      <div className='w-full mx-auto h-14 pr-2 pl-2'>
        <div className='w-full h-full mx-auto flex justify-between items-center border rounded bg-white drop-shadow-md p-2 overflow-x-scroll mt-20'>
          <NavLink to='/dashboard'>
            <button
              autoFocus={path === '/dashboard'}
              className={path === '/dashboard' ? activeLink : notActiveLink}
            >
              <AiFillHome className='mr-1' />
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
              <HiOutlineTemplate className='mr-1' />
              Templates
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
              <BsPalette className='mr-1' />
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
              <MdOutlineShoppingCart classsName='mr-1' />
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
              <BiMessageSquareDetail className='mr-1' />
              Reviews
            </button>
          </NavLink>

          <NavLink to='/dashboard/customers'>
            <button
              autoFocus={path === '/dashboard/customers'}
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
              autoFocus={path === '/dashboard/library'}
              className={
                path === '/dashboard/library' || path === '/dashboard/library'
                  ? activeLink
                  : notActiveLink
              }
            >
              <BsBookmarkHeart className='mr-1' />
              Library
            </button>
          </NavLink>

          <NavLink to='/dashboard/config'>
            <button
              autoFocus={path === '/dashboard/config'}
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
    </>
  );
};

export default TopbarMobile;
