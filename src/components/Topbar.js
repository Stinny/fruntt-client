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
import { HiOutlineTemplate } from 'react-icons/hi';
import Cookies from 'js-cookie';

const Topbar = () => {
  //for changing nav links according to the page
  const path = window.location.pathname;
  const activeLink =
    'text-md h-10 font-medium text-white w-full rounded-md bg-stone-800 flex items-center pl-2 outline outline-0';
  const notActiveLink =
    'text-md font-medium w-full h-10 hover:bg-gray-100 rounded-md text-stone-800 flex items-center pl-2 outline outline-0';

  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  return isMobile ? (
    // <TopbarMobile />
    ''
  ) : (
    <div className='w-2/12'>
      <div className='w-full h-full flex flex-col border-r bg-white p-4 relative'>
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
              <HiOutlineTemplate className='mr-1' />
              Templates
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
            <button className='border-2 w-full font-medium text-stone-800 text-sm border-stone-800 hover:bg-stone-800 hover:text-white rounded-md p-2 flex items-center justify-center'>
              New Template <HiOutlineTemplate className='ml-1' />
            </button>
          </Link>
          <a
            href={currentUser?.store?.url}
            className='flex justify-center items-center text-sm text-stone-800 font-medium w-full'
            target='_blank'
          >
            <div className='flex items-center justify-center mt-2 bg-gray-100 rounded-md p-1 w-full'>
              Your Store
              <BiLinkExternal className='ml-1' />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
