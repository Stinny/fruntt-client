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

  const tempIcon = <Layout size={20} />;

  return isMobile ? (
    // <TopbarMobile />
    ''
  ) : (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard'>
            <Sidebar.Item
              icon={Home}
              className={path === '/dashboard' ? activeLink : notActiveLink}
            >
              Home
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard/templates'>
            <Sidebar.Item
              icon={Layout}
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
              icon={ShoppingCart}
              label='3'
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
              icon={User}
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
              icon={Bookmark}
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
              icon={DollarSign}
              className={path === '/marketplace' ? activeLink : notActiveLink}
            >
              Marketplace
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard/payouts'>
            <Sidebar.Item
              icon={CreditCard}
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
              icon={Settings}
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

          <Link to={`/${currentUser?.store?.name}`} className='w-full'>
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
            You need to add a payout option in settings before you can submit a
            template to be published.
          </div>
        </Sidebar.CTA>
      )}
    </Sidebar>
    // <div className='w-2/12'>
    //   <div className='w-full h-full flex flex-col border-r bg-white p-4 relative'>
    //     <p className='text-stone-800 text-sm'>Store</p>
    //     <div className='border-b flex flex-col pb-2'>
    //       <NavLink to='/dashboard' className='mt-2'>
    //         <button
    //           className={path === '/dashboard' ? activeLink : notActiveLink}
    //         >
    //           <AiOutlineHome className='mr-1' />
    //           Home
    //         </button>
    //       </NavLink>

    //       <NavLink to='/dashboard/item' className='mt-2'>
    //         <button
    //           className={
    //             path === '/dashboard/item' ||
    //             path === '/dashboard/item/import' ||
    //             path.startsWith('/dashboard/item/edit')
    //               ? activeLink
    //               : notActiveLink
    //           }
    //         >
    //           <HiOutlineTemplate className='mr-1' />
    //           Templates
    //         </button>
    //       </NavLink>

    //       <NavLink to='/dashboard/design' className='mt-2'>
    //         <button
    //           className={
    //             path === '/dashboard/design' ||
    //             path === '/dashboard/design/edit'
    //               ? activeLink
    //               : notActiveLink
    //           }
    //         >
    //           <BsPalette className='mr-1' />
    //           Design
    //         </button>
    //       </NavLink>

    //       <NavLink to='/dashboard/orders' className='mt-2'>
    //         <button
    //           className={
    //             path === '/dashboard/orders' ||
    //             path === '/dashboard/orders/:orderId'
    //               ? activeLink
    //               : notActiveLink
    //           }
    //         >
    //           <MdOutlineShoppingCart classsName='mr-1' />
    //           Orders
    //         </button>
    //       </NavLink>

    //       <NavLink to='/dashboard/reviews' className='mt-2'>
    //         <button
    //           className={
    //             path === '/dashboard/reviews' ? activeLink : notActiveLink
    //           }
    //         >
    //           <BiMessageSquareDetail className='mr-1' />
    //           Reviews
    //         </button>
    //       </NavLink>

    //       <NavLink to='/dashboard/customers' className='mt-2'>
    //         <button
    //           className={
    //             path === '/dashboard/customers' ? activeLink : notActiveLink
    //           }
    //         >
    //           <BsPeople className='mr-1' />
    //           Customers
    //         </button>
    //       </NavLink>

    //       {/* <NavLink to='/dashboard/config' className='mt-2'>
    //         <button
    //           className={
    //             path === '/dashboard/config' ? activeLink : notActiveLink
    //           }
    //         >
    //           <AiOutlineTool className='mr-1' />
    //           Config
    //         </button>
    //       </NavLink> */}
    //     </div>

    //     <div className='flex flex-col mt-2'>
    //       <p className='text-sm text-stone-800'>Account</p>
    //       <NavLink to='/dashboard/library' className='mt-2'>
    //         <button
    //           className={
    //             path === '/dashboard/library' || path === '/dashboard/library'
    //               ? activeLink
    //               : notActiveLink
    //           }
    //           bookmark
    //         >
    //           <BsBookmarkHeart className='mr-1' />
    //           Library
    //         </button>
    //       </NavLink>

    //       <NavLink to='/marketplace' className='mt-2'>
    //         <button
    //           className={
    //             path === '/marketplace' || path === '/marketplace'
    //               ? activeLink
    //               : notActiveLink
    //           }
    //           bookmark
    //         >
    //           <HiOutlineBuildingStorefront className='mr-1' />
    //           Marketplace
    //         </button>
    //       </NavLink>
    //       <div className='flex flex-col border-b'>
    //         <NavLink to='/settings' className='mt-2'>
    //           <button
    //             className={path === '/settings' ? activeLink : notActiveLink}
    //           >
    //             <BsGear className='mr-1' />
    //             Settings
    //           </button>
    //         </NavLink>
    //         <NavLink to='/feedback' className='mt-2 mb-2'>
    //           <button
    //             className={path === '/feedback' ? activeLink : notActiveLink}
    //           >
    //             <VscFeedback className='mr-1' />
    //             Feedback
    //           </button>
    //         </NavLink>
    //       </div>
    //       <Link to='/dashboard/item/digital' className='w-full mt-2'>
    //         <button className='border-2 w-full font-medium text-stone-800 text-sm border-stone-800 hover:bg-stone-800 hover:text-white rounded-md p-2 flex items-center justify-center'>
    //           New Template <HiOutlineTemplate className='ml-1' />
    //         </button>
    //       </Link>
    //       <a
    //         href={currentUser?.store?.url}
    //         className='flex justify-center items-center text-sm text-stone-800 font-medium w-full'
    //         target='_blank'
    //       >
    //         <div className='flex items-center justify-center mt-2 bg-gray-100 rounded-md p-1 w-full'>
    //           Your Store
    //           <BiLinkExternal className='ml-1' />
    //         </div>
    //       </a>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Topbar;
