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
import {
  Bookmark,
  CreditCard,
  DollarSign,
  Home,
  Layout,
  Settings,
  ShoppingCart,
  User,
} from 'react-feather';

//flowbite
import { Badge, Sidebar } from 'flowbite-react';

const Topbar = () => {
  //for changing nav links according to the page
  const path = window.location.pathname;
  const activeLink =
    'text-sm h-8 font-medium text-stone-800 w-full rounded-md bg-gray-200 flex items-center pl-2 outline outline-0';
  const notActiveLink =
    'text-sm font-medium w-full h-8 hover:bg-gray-200 rounded-md text-stone-800 flex items-center pl-2 outline outline-0';

  const currentStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const homeIcon = () => {
    return <Home size={18} />;
  };

  const tempIcon = () => {
    return <Layout size={18} />;
  };

  const ordersIcon = () => {
    return <ShoppingCart size={18} />;
  };

  const custIcon = () => {
    return <User size={18} />;
  };

  const payIcon = () => {
    return <CreditCard size={18} />;
  };

  const libIcon = () => {
    return <Bookmark size={18} />;
  };

  const markIcon = () => {
    return <DollarSign size={18} />;
  };

  const settingsIcon = () => {
    return <Settings size={18} />;
  };

  return isMobile ? (
    // <TopbarMobile />
    ''
  ) : (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard'>
            <Sidebar.Item
              icon={homeIcon}
              className={path === '/dashboard' ? activeLink : notActiveLink}
            >
              Home
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard/templates'>
            <Sidebar.Item
              icon={tempIcon}
              className={
                path === '/dashboard/templates' ||
                path.startsWith('/dashboard/item/edit')
                  ? activeLink
                  : notActiveLink
              }
              style={{ marginTop: '2px' }}
            >
              Templates
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard/orders'>
            <Sidebar.Item
              icon={ordersIcon}
              // label='3'
              className={
                path === '/dashboard/orders' ||
                path === '/dashboard/orders/:orderId'
                  ? activeLink
                  : notActiveLink
              }
              style={{ marginTop: '2px' }}
            >
              Orders
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard/customers'>
            <Sidebar.Item
              icon={custIcon}
              className={
                path === '/dashboard/customers' ? activeLink : notActiveLink
              }
              style={{ marginTop: '2px' }}
            >
              Customers
            </Sidebar.Item>
          </Link>

          <Link to='/dashboard/library'>
            <Sidebar.Item
              icon={libIcon}
              className={
                path === '/dashboard/library' ? activeLink : notActiveLink
              }
              style={{ marginTop: '2px' }}
            >
              Library
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <Link to='/marketplace'>
            <Sidebar.Item
              icon={markIcon}
              className={path === '/marketplace' ? activeLink : notActiveLink}
            >
              Marketplace
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard/payouts'>
            <Sidebar.Item
              icon={payIcon}
              className={
                path === '/dashboard/payouts' ? activeLink : notActiveLink
              }
              style={{ marginTop: '2px' }}
            >
              Payouts
            </Sidebar.Item>
          </Link>
          <Link to='/settings'>
            <Sidebar.Item
              icon={settingsIcon}
              className={path === '/settings' ? activeLink : notActiveLink}
              style={{ marginTop: '2px' }}
            >
              Settings
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>

        <Sidebar.ItemGroup>
          <Link to='/dashboard/new/template' className='w-full'>
            <button className='w-full text-stone-800 text-sm bg-gray-200 rounded-md p-1 flex items-center justify-center'>
              New +
            </button>
          </Link>

          <Link
            to={`/${currentUser?.store?.name}`}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full'
          >
            <button className='w-full text-stone-800 text-sm bg-gray-200 rounded-md p-1 flex items-center justify-center mt-1'>
              Your Page
            </button>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>

      {!currentUser?.stripeOnboard && !currentUser?.bankAdded && (
        <Sidebar.CTA>
          <div className='mb-3 flex items-center'>
            <Badge color='failure'>Payouts disabled</Badge>
          </div>
          <div className='text-xs text-stone-800 dark:text-gray-400'>
            You need to connect to a payout option in settings before you can
            submit a template to be published.
          </div>
        </Sidebar.CTA>
      )}
    </Sidebar>
  );
};

export default Topbar;
