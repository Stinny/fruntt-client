import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { FiSettings } from 'react-icons/fi';
import { CgProfile } from 'react-icons/cg';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { IoStorefrontOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import handleLogoutUser from '../utils/logout';
import Cookies from 'js-cookie';

//mui
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Dashboard from '@mui/icons-material/Dashboard';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';

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

  return currentUser ? (
    <nav className='w-full h-16 border-b-2'>
      <div className='max-w-7xl h-full mx-auto flex justify-between items-center'>
        {/* logo section */}
        <div className='text-4xl h-full flex justify-center items-center'>
          <Link
            to='/dashboard'
            className='h-full flex justify-center items-center'
          >
            <IoStorefrontOutline className='text-slate-800 font-bold' />
            <h2 className='font-black font-sans'>Fruntt</h2>
          </Link>
        </div>

        {/* links section */}
        <div className='h-full flex items-center w-64 flex justify-between'>
          <a
            href={currentUser?.store?.url}
            className='flex justify-center items-center'
            target='_blank'
          >
            View your storefront <FaExternalLinkAlt className='ml-2' />{' '}
          </a>
          <MdOutlineNotificationsNone className='text-2xl' />

          <CgProfile className='text-2xl' onClick={handleClick} />
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
    <nav className='w-full h-16 border-b-2 fixed bg-white'>
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
            <p className='font-medium text-stone-800 hover:text-blue-300'>
              How To?
            </p>
          </Link>
          <Link to='/'>
            <p className='font-medium text-stone-800 hover:text-blue-300'>
              About
            </p>
          </Link>
          <Link to='/pricing'>
            <p className='font-medium text-stone-800 hover:text-blue-300'>
              Pricing
            </p>
          </Link>
          <Link to='/login'>
            <button className='border-2 text-slate-800 border-blue-300 hover:bg-blue-300 rounded w-20 h-full'>
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
