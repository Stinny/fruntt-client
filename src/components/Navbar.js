import React, { useState, useEffect } from 'react';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { IoStorefrontOutline } from 'react-icons/io5';
import { BiHelpCircle } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import handleLogoutUser from '../utils/logout';
import Cookies from 'js-cookie';
import { BsDiscord } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import MobileNavbar from './MobileNavbar';

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
  const [isOpen, setIsOpen] = useState(false);

  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

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
    <nav className='w-full h-16 border-b-2'>
      <HelpModal
        isOpen={isOpen}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
      <div className='max-w-7xl h-full mx-auto flex justify-between items-center'>
        {/* logo section */}
        <div className='text-4xl h-full flex justify-center items-center'>
          <Link
            to='/dashboard'
            className='h-full flex justify-center items-center'
          >
            <IoStorefrontOutline className='text-slate-800 font-bold' />
            <h2 className='font-black text-slate-800 font-sans'>Fruntt</h2>
          </Link>
        </div>

        <div className='flex items-center h-full'>
          <p className='font-medium mr-2'>Viewing:</p>
          <select className='rounded border-2 w-72 h-10'>
            <option>{currentUser?.store?.url}</option>
          </select>
          <Tooltip title='Coming soon' className='ml-2' placement='bottom'>
            <button
              type='button'
              disabled
              className='ml-2 text-gray-400 hover:text-gray-800'
            >
              + Add storefront
            </button>
          </Tooltip>
        </div>

        {/* links section */}
        <div className='h-full flex items-center w-56 flex justify-between'>
          <Link to='/feedback'>Give Feedback</Link>

          <BiHelpCircle
            className='text-2xl hover:cursor-pointer'
            onClick={handleOpenModal}
          />

          <MdOutlineNotificationsNone className='text-2xl hover:cursor-pointer' />

          <CgProfile
            className='text-2xl hover:cursor-pointer'
            onClick={handleClick}
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
              <Avatar />
              <div className='flex justify-between'>
                {currentUser.firstName && <p>{currentUser?.firstName}</p>}
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
    <nav className='w-full h-16 border-b-2 bg-white'>
      <div className='max-w-7xl h-full mx-auto flex justify-between items-center'>
        {/* logo section */}
        <div className='text-4xl h-full flex justify-center items-center'>
          <Link to='/' className='h-full flex justify-center items-center'>
            <IoStorefrontOutline className='text-slate-800 font-bold' />
            <h2 className='font-black font-sans'>Fruntt</h2>
          </Link>
        </div>

        {/* links section */}
        <div className='h-full flex items-center w-72 flex justify-between'>
          <Link to='/'>
            <p className='font-medium text-slate-800'>About</p>
          </Link>
          <Link to='/pricing'>
            <p className='font-medium text-slate-800'>Pricing</p>
          </Link>
          <a
            href='https://discord.gg/6GHYR2xn'
            target='_blank'
            className='font-medium'
            style={{ color: '#738adb' }}
          >
            <BsDiscord className='text-3xl' />
          </a>
          <Link to='/login'>
            <button className='border-2 text-slate-800 border-slate-800 hover:bg-slate-800 hover:text-white rounded w-20 h-full'>
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
