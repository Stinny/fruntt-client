import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import TopbarMobile from './TopbarMobile';
import { AiOutlineHome, AiOutlineTool } from 'react-icons/ai';
import {
  BiPackage,
  BiMessageSquareDetail,
  BiLinkExternal,
} from 'react-icons/bi';
import { BsPalette, BsBookmarkHeart, BsGear, BsPeople } from 'react-icons/bs';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';
import Cookies from 'js-cookie';

const Topbar = () => {
  //for changing nav links according to the page
  const path = window.location.pathname;
  const activeLink =
    'text-md h-10 font-medium text-white w-full rounded bg-stone-800 flex items-center pl-2';
  const notActiveLink =
    'text-md font-medium w-full h-10 hover:bg-gray-100 rounded text-stone-800 flex items-center pl-2';

  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  return isMobile ? (
    // <TopbarMobile />
    ''
  ) : (
    <div className='w-3/12 mx-auto'>
      <div className='w-full h-full mx-auto flex flex-col border-r bg-white p-6 relative'>
        <p className='text-stone-800 text-sm'>Store</p>
        <div className='border-b flex flex-col pb-2'>
          <NavLink to='/dashboard' className='mt-2'>
            <button
              className={path === '/dashboard' ? activeLink : notActiveLink}
            >
              <AiOutlineHome className='mr-1' />
              Home
            </button>
          </NavLink>

          <NavLink to='/dashboard/item' className='mt-2'>
            <button
              className={
                path === '/dashboard/item' ||
                path === '/dashboard/item/import' ||
                path.startsWith('/dashboard/item/edit')
                  ? activeLink
                  : notActiveLink
              }
            >
              <BiPackage className='mr-1' />
              Products
            </button>
          </NavLink>

          <NavLink to='/dashboard/design' className='mt-2'>
            <button
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

          <NavLink to='/dashboard/orders' className='mt-2'>
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

          <NavLink to='/dashboard/reviews' className='mt-2'>
            <button
              className={
                path === '/dashboard/reviews' ? activeLink : notActiveLink
              }
            >
              <BiMessageSquareDetail className='mr-1' />
              Reviews
            </button>
          </NavLink>

          <NavLink to='/dashboard/customers' className='mt-2'>
            <button
              className={
                path === '/dashboard/customers' ? activeLink : notActiveLink
              }
            >
              <BsPeople className='mr-1' />
              Customers
            </button>
          </NavLink>

          {/* <NavLink to='/dashboard/config' className='mt-2'>
            <button
              className={
                path === '/dashboard/config' ? activeLink : notActiveLink
              }
            >
              <AiOutlineTool className='mr-1' />
              Config
            </button>
          </NavLink> */}
        </div>

        <div className='flex flex-col mt-2'>
          <p className='text-sm text-stone-800'>Account</p>
          <NavLink to='/dashboard/library' className='mt-2'>
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

          <NavLink to='/marketplace' className='mt-2'>
            <button
              className={
                path === '/marketplace' || path === '/marketplace'
                  ? activeLink
                  : notActiveLink
              }
              bookmark
            >
              <HiOutlineBuildingStorefront className='mr-1' />
              Marketplace
            </button>
          </NavLink>
          <div className='flex flex-col border-b'>
            <NavLink to='/settings' className='mt-2'>
              <button
                className={path === '/settings' ? activeLink : notActiveLink}
              >
                <BsGear className='mr-1' />
                Settings
              </button>
            </NavLink>
            <NavLink to='/feedback' className='mt-2 mb-2'>
              <button
                className={path === '/feedback' ? activeLink : notActiveLink}
              >
                <VscFeedback className='mr-1' />
                Feedback
              </button>
            </NavLink>
          </div>
          <Link to='/dashboard/item/digital' className='w-full mt-2'>
            <button className='border-2 w-full font-medium text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white rounded p-2 flex items-center justify-center'>
              New Product <BiPackage className='ml-1' />
            </button>
          </Link>
          <div className='flex items-center mt-2 bg-white'>
            <p className='text-md text-stone-800'>Your store:</p>
            <a
              href={currentUser?.store?.url}
              className='flex justify-center items-center text-md text-stone-800 font-medium ml-2'
              target='_blank'
            >
              {currentUser?.store?.url}
            </a>
            <BiLinkExternal className='ml-1' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
