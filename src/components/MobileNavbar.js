import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { IoStorefrontOutline } from 'react-icons/io5';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { MdOutlineSell } from 'react-icons/md';
import { BsDiscord } from 'react-icons/bs';
import HelpModal from '../components/HelpModal';
import { useLazyGetStorefrontByIDQuery } from '../api/storefrontApiSlice';
import { setSelectedStore, setSelectedStoreUrl } from '../redux/userRedux';
import { GrCloudDownload } from 'react-icons/gr';
import { AiOutlineHome, AiOutlineTool } from 'react-icons/ai';
import {
  BiPackage,
  BiMessageSquareDetail,
  BiLinkExternal,
  BiMoneyWithdraw,
} from 'react-icons/bi';
import { BsPalette, BsBookmarkHeart, BsGear, BsPeople } from 'react-icons/bs';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';
import { HiOutlineBuildingStorefront } from 'react-icons/hi2';

const MobileNavbar = ({ currentUser, handleLogout }) => {
  const dispatch = useDispatch();

  const path = window.location.pathname;
  const activeLink =
    'text-sm h-8 font-medium text-white w-full rounded bg-stone-800 flex items-center pl-2 mt-1';
  const notActiveLink =
    'text-sm font-medium w-full h-8 hover:bg-gray-100 rounded text-stone-800 flex items-center pl-2 mt-1';

  //holds the url of the page being viewed
  const selectedStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const [pageInView, setPageInView] = useState(currentUser?.store?.url);

  const [isOpen, setIsOpen] = useState(false);

  const [menuW, setW] = useState('w-0');
  const [menuH, setH] = useState('h-0');
  const [menuDisplay, setDisplay] = useState('none');
  const [opacity, setOpactity] = useState('opacity-0');
  const [close, setClose] = useState(false);

  const [getStorefrontByID, result] = useLazyGetStorefrontByIDQuery();

  const filteredStores = currentUser?.storeIds.filter(
    (store) => store.url !== pageInView
  );

  useEffect(() => {
    const getStore = async () => {
      const selectedStore = currentUser?.storeIds.filter(
        (store) => store.url === pageInView
      );

      dispatch(setSelectedStore(selectedStore[0].id));
      dispatch(setSelectedStoreUrl(pageInView));

      const storeReq = await getStorefrontByID({
        storeId: selectedStore[0].id,
      }).unwrap();

      currentUser.store = storeReq.storefront;

      const newUser = JSON.stringify(currentUser);
      Cookies.set('currentUser', newUser, { sameSite: 'Lax' });
    };

    if (currentUser) getStore();
  }, [pageInView]);

  useEffect(() => {
    closeMenu();
  }, [pageInView]);

  const handleOpenModal = () => {
    setIsOpen(true);
    closeMenu();
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const closeMenu = () => {
    setH('h-0');
    setW('w-0');
    setDisplay('none');
    setOpactity('opacity-0');
  };

  const openMenu = () => {
    setH('h-screen');
    setW('w-screen');
    setDisplay('');
    setOpactity('opacity-95');
  };

  return currentUser ? (
    <>
      <HelpModal
        isOpen={isOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
      <nav className='w-full h-16 border-b shadow bg-white fixed top-0 left-0 right-0 z-50'>
        <div className='w-11/12 h-full mx-auto flex justify-between items-center'>
          <div className='text-2xl h-full flex justify-center items-center'>
            <Link to='/' className='h-full flex justify-center items-center'>
              <IoStorefrontOutline className='text-stone-800 font-bold' />
              <p
                className='font-black mt-1'
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Fruntt
              </p>
            </Link>
          </div>

          <div className='flex items-center h-full'>
            <HiMenu className='text-2xl font-black' onClick={openMenu} />
          </div>
        </div>
      </nav>
      <div
        className={`fixed h-screen z-50 ${menuW} ${menuH} bg-white`}
        style={{ display: menuDisplay }}
      >
        <button className='text-red-400 font-medium absolute top-0 right-0 mr-4 mt-4'>
          <AiOutlineCloseCircle className='text-2xl' onClick={closeMenu} />
        </button>

        {/* <div className='flex flex-col w-10/12 mx-auto items-center mt-20'>
          <Link to='/dashboard/item/digital' className='w-10/12 mx-auto'>
            <button
              className='w-full mx-auto h-12 border-2 rounded border-stone-800 text-white bg-stone-800 text-xl mt-20 shadow-lg'
              disabled
              type='button'
            >
              + New Product
            </button>
          </Link>

          <Link
            to='/settings'
            className='text-2xl font-medium mt-10 border-b-2'
          >
            Settings
          </Link>
          <Link
            to='/feedback'
            className='text-2xl font-medium mt-10 border-b-2'
          >
            Give feedback
          </Link>

          <button
            className='w-10/12 h-14 border-2 rounded border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 text-xl mt-20 shadow-lg'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div> */}
        <div className='w-full h-full mx-auto flex flex-col bg-white p-4'>
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
              <button className='border-2 w-full font-medium text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white text-sm rounded p-2 flex items-center justify-center'>
                New Product <BiPackage className='ml-1' />
              </button>
            </Link>
            <button
              className='w-full p-2 border-2 rounded border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 text-sm mt-2'
              onClick={handleLogout}
            >
              Logout
            </button>
            <div className='flex items-center mt-2 bg-white'>
              <p className='text-sm text-stone-800'>Your store:</p>
              <a
                href={currentUser?.store?.url}
                className='flex justify-center items-center text-sm text-stone-800 font-medium ml-2'
                target='_blank'
              >
                {currentUser?.store?.url}
              </a>
              <BiLinkExternal className='ml-1' />
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <nav className='w-full border-b shadow bg-white fixed top-0 left-0 right-0 z-50'>
        {close ? (
          ''
        ) : (
          <div className='w-full h-8 bg-stone-800 flex items-center justify-center'>
            {' '}
            <p className='text-sm text-white'>
              We recommend to use in a desktop browser
            </p>
            <AiOutlineCloseCircle
              className='ml-4 text-white'
              onClick={(e) => setClose(true)}
            />
          </div>
        )}
        <div className='w-11/12 h-16 mx-auto flex justify-between items-center'>
          <div className='text-2xl h-full flex justify-center items-center'>
            <Link to='/' className='h-full flex justify-center items-center'>
              <IoStorefrontOutline className='text-stone-800 font-bold' />
              <p
                className='text-stone-800 font-black mt-1'
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Fruntt
              </p>
            </Link>
          </div>

          <div className='flex items-center h-full'>
            <HiMenu className='text-2xl font-black' onClick={openMenu} />
          </div>
        </div>
      </nav>
      <div
        className={`fixed z-50 ${menuW} ${menuH} bg-white`}
        style={{ display: menuDisplay }}
      >
        <button className='text-red-400 font-medium absolute top-0 right-0 mr-4 mt-4'>
          <AiOutlineCloseCircle className='text-3xl' onClick={closeMenu} />
        </button>

        <div className='flex flex-col w-full h-full mx-auto items-center'>
          <Link
            to='/marketplace'
            className='text-2xl font-medium mt-20 flex items-center'
          >
            Buy <MdOutlineSell className='ml-2' />
          </Link>
          <Link
            to='/signup'
            className='text-2xl font-medium mt-20 flex items-center'
          >
            Sell <BiMoneyWithdraw className='ml-2' />
          </Link>

          {/* <a
            href='https://discord.gg/6GHYR2xn'
            target='_blank'
            className='font-medium'
            style={{ color: '#738adb' }}
            className='mt-20'
          >
            <BsDiscord className='text-4xl border-b-2' />
          </a> */}

          <Link to='/login' className='w-full flex justify-center mt-20'>
            <button className='w-10/12 h-14 border-2 rounded border-slate-800 text-slate-800 hover:text-white hover:bg-slate-800 text-xl'>
              Login
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
