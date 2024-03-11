import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { FaBars } from 'react-icons/fa6';
import { CgProfile } from 'react-icons/cg';
import { IoStorefrontOutline } from 'react-icons/io5';
import { IoMdHelpCircleOutline } from 'react-icons/io';
import { MdOutlineSell } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import handleLogoutUser from '../utils/logout';
import Cookies from 'js-cookie';
import { BiMoneyWithdraw, BiPackage } from 'react-icons/bi';
import { VscFeedback } from 'react-icons/vsc';
import { isMobile } from 'react-device-detect';
import MobileNavbar from './MobileNavbar';
import { useLazyGetStorefrontByIDQuery } from '../api/storefrontApiSlice';
import {
  setSelectedStore,
  setStoreIds,
  setSelectedStoreUrl,
} from '../redux/userRedux';
import 'react-toastify/dist/ReactToastify.css';
import { Bell, HelpCircle } from 'react-feather';

//mui
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Dashboard from '@mui/icons-material/Dashboard';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import HelpModal from './HelpModal';
import Tooltip from '@mui/material/Tooltip';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //holds the url of the page being viewed
  const selectedStoreUrl = useSelector((state) => state.user.selectedStoreUrl);

  const [isOpen, setIsOpen] = useState(false);

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  const [pageInView, setPageInView] = useState(currentUser?.store?.url);

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

  //for dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleLogoutUser(navigate); //logout function in utils
  };

  useEffect(() => {
    const firstTime = () => {
      setTimeout(() => setIsOpen(true), 2.5 * 1000);
      localStorage.setItem('firstTime', true);
    };

    const isFirstTime = localStorage.getItem('firstTime');

    if (!isFirstTime && currentUser) firstTime();
  }, []);

  return isMobile ? (
    <MobileNavbar
      currentUser={currentUser}
      handleLogout={handleLogout}
      handleOpenModal={handleOpenModal}
    />
  ) : currentUser ? (
    <nav className='w-full h-16 border-b bg-white top-0 left-0 right-0 pr-4 pl-4 mb-8'>
      <div className='max-w-6xl h-full mx-auto flex justify-between items-center'>
        {/* logo section */}
        <div className='h-full flex justify-center items-center'>
          <Link
            to='/dashboard'
            className='h-full flex justify-center items-center'
          >
            <IoStorefrontOutline className='text-stone-800 font-bold text-xl' />
            <p
              className='font-black text-stone-800 mt-2 text-md'
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Fruntt
            </p>
          </Link>
        </div>

        {/* <div className='flex items-center h-full'>
          <Link to='/dashboard/item/digital'>
            <button className='border-2 font-medium text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white rounded p-2 flex items-center'>
              New Product <BiPackage className='ml-1' />
            </button>
          </Link>
        </div> */}

        {/* links section */}
        <div className='h-full flex items-center justify-between w-24'>
          {/* <Link to='/feedback'>Give Feedback</Link> */}

          {/* <BiHelpCircle
            className='text-2xl hover:cursor-pointer'
            onClick={handleOpenModal}
          /> */}

          <Bell className='hover:cursor-pointer' size={18} />

          <Link to='/contact'>
            <HelpCircle size={18} className='hover:cursor-pointer' />
          </Link>

          {/* <FaBars
            className='text-2xl hover:cursor-pointer ml-4'
            onClick={handleClick}
          /> */}
          <Avatar
            src={
              currentUser?.sellerProfile?.picture?.url
                ? currentUser?.sellerProfile?.picture?.url
                : currentUser?.email
            }
            onClick={handleClick}
            sx={{ width: 26, height: 26 }}
            className='hover:cursor-pointer'
          />
          <Menu
            anchorEl={anchorEl}
            id='account-menu'
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            className='hover:cursor-pointer'
          >
            <MenuItem>
              <Avatar src={currentUser?.sellerProfile?.picture?.url} />
              <div className='flex justify-between'>
                {currentUser.name && <p>{currentUser?.name}</p>}
              </div>
            </MenuItem>
            <Divider />
            <Link to='/dashboard'>
              <MenuItem>
                <ListItemIcon>
                  <Dashboard fontSize='small' />
                </ListItemIcon>
                Dashboard
              </MenuItem>
            </Link>

            <Link to='/settings'>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize='small' />
                </ListItemIcon>
                Settings
              </MenuItem>
            </Link>
            <Link to='/feedback'>
              <MenuItem>
                <ListItemIcon>
                  <VscFeedback />
                </ListItemIcon>
                Feedback
              </MenuItem>
            </Link>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize='small' />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  ) : (
    <nav className='w-full h-16 border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-50 mb-8'>
      <div className='max-w-6xl h-full mx-auto flex justify-between items-center mb-8'>
        {/* logo section */}
        <div className='h-full flex justify-center items-center'>
          <Link to='/' className='h-full flex justify-center items-center'>
            <IoStorefrontOutline className='text-stone-800 font-bold text-xl' />
            <p
              className='text-stone-800 font-bold mt-1 text-md'
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Fruntt
            </p>
          </Link>
        </div>

        {/* links section */}
        <div className='h-full flex items-center justify-between'>
          {/* <Link to='/marketplace' className='flex items-center'>
            <p className='text-stone-800 text-xl font-medium'>Buy</p>
            <MdOutlineSell className='text-2xl txt-stone-800' />
          </Link>
          <Link to='/signup' className='flex items-center'>
            <p className='font-medium text-stone-800 text-xl ml-20'>Sell</p>
            <BiMoneyWithdraw className='text-2xl text-stone-800' />
          </Link> */}

          <div className='flex justify-between items-center w-52'>
            <Link
              to='/marketplace'
              className='flex text-sm h-8 w-14 justify-center items-center hover:bg-gray-200 text-stone-800 rounded-md'
            >
              <p className='font-medium'>Buy</p>
            </Link>
            <Link
              to='/signup'
              className='flex text-sm h-8 w-14 items-center justify-center hover:bg-gray-200 text-stone-800 rounded-md'
            >
              <p className='font-medium'>Sell</p>
            </Link>
            <Link
              to='/login'
              className='flex text-sm items-center justify-center bg-gray-200 text-stone-800 rounded-md h-8 w-14'
            >
              <p className='font-medium'>Login</p>
            </Link>
          </div>

          {/* <Link to='/login'>
            <button className='border-2 font-medium text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white rounded w-20 h-10 ml-20'>
              Login
            </button>
          </Link> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
