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
import { Bell, HelpCircle, Settings } from 'react-feather';

//mui
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Dashboard from '@mui/icons-material/Dashboard';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import HelpModal from './HelpModal';
import Tooltip from '@mui/material/Tooltip';

const Navbar = () => {
  const navigate = useNavigate();

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  //for dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleLogoutUser(navigate); //logout function in utils
  };

  return isMobile ? (
    <MobileNavbar currentUser={currentUser} handleLogout={handleLogout} />
  ) : currentUser ? (
    <nav className='w-full bg-white top-0 left-0 right-0 mb-8'>
      <div className='max-w-6xl h-full mx-auto flex justify-between items-center border border-gray-200 rounded-md mt-8 p-2'>
        {/* logo section */}
        <div>
          <Link to='/dashboard' className='h-full flex'>
            <IoStorefrontOutline className='text-stone-800 font-bold text-xl' />
            <p
              className='font-black text-stone-800 text-md mt-1'
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
                backgroundColor: 'rgb(249 250 251)',
                // filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
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

            <Link to='/settings'>
              <MenuItem>
                <ListItemIcon>
                  <Settings size={18} />
                </ListItemIcon>
                Settings
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
    <nav className='w-full bg-white fixed top-0 z-50'>
      <div className='max-w-6xl mx-auto flex justify-between items-center border border-gray-200 rounded-md p-2 mt-8'>
        {/* logo section */}

        <Link to='/' className='h-full flex'>
          <IoStorefrontOutline className='text-stone-800 font-bold text-xl' />
          <p
            className='text-stone-800 font-black mt-1 text-md'
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Fruntt
          </p>
        </Link>

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

          <div className='flex gap-2 items-center'>
            <Link
              to='/marketplace'
              className='flex text-xs p-1 pl-2 pr-2 justify-center items-center hover:bg-gray-200 text-stone-800 rounded-md'
            >
              <p className='font-medium'>Buy</p>
            </Link>
            <Link
              to='/signup'
              className='flex text-xs p-1 pl-2 pr-2 items-center justify-center hover:bg-gray-200 text-stone-800 rounded-md'
            >
              <p className='font-medium'>Sell</p>
            </Link>
            <Link
              to='/login'
              className='flex text-xs items-center justify-center bg-gray-200 text-stone-800 rounded-md p-1 pl-2 pr-2'
            >
              <p className='font-medium'>Login</p>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
