import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import { useLazyGetStorefrontByIDQuery } from '../api/storefrontApiSlice';
import {
  setSelectedStore,
  setStoreIds,
  setSelectedStoreUrl,
} from '../redux/userRedux';
import 'react-toastify/dist/ReactToastify.css';

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
    <nav className='w-full h-16 border-b shadow bg-white fixed top-0 left-0 right-0 z-50'>
      <div className='max-w-7xl h-full mx-auto flex justify-between items-center'>
        {/* logo section */}
        <div className='text-2xl h-full flex justify-center items-center'>
          <Link
            to='/dashboard'
            className='h-full flex justify-center items-center'
          >
            <IoStorefrontOutline className='text-stone-800 font-bold' />
            <p className='font-black text-stone-800 font-sans'>Fruntt</p>
          </Link>
        </div>

        <div className='flex items-center h-full'>
          {currentUser.storeIds.length > 0 ? (
            <>
              <p className='font-medium mr-2'>Viewing:</p>
              <select
                className='rounded border-2 w-72 h-10 p-1'
                onChange={(e) => setPageInView(e.target.value)}
                value={selectedStoreUrl}
              >
                <option selected disabled>
                  {selectedStoreUrl}
                </option>
                {filteredStores?.map((store) => (
                  <option value={store?.url}>{store?.url}</option>
                ))}
              </select>
              <Link
                to='/addpage'
                type='button'
                disabled
                className='ml-2 text-gray-400 hover:text-gray-800'
              >
                + Add page
              </Link>
            </>
          ) : (
            ''
          )}
        </div>

        {/* links section */}
        <div className='h-full flex items-center w-56 justify-between'>
          <Link to='/feedback'>Give Feedback</Link>

          {/* <BiHelpCircle
            className='text-2xl hover:cursor-pointer'
            onClick={handleOpenModal}
          /> */}

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
    <nav className='w-full h-16 border-b shadow bg-white fixed top-0 left-0 right-0 z-50'>
      <div className='max-w-7xl h-full mx-auto flex justify-between items-center'>
        {/* logo section */}
        <div className='text-2xl h-full flex justify-center items-center'>
          <Link to='/' className='h-full flex justify-center items-center'>
            <IoStorefrontOutline className='text-slate-800 font-bold' />
            <p className='font-black font-sans'>Fruntt</p>
          </Link>
        </div>

        {/* links section */}
        <div className='h-full flex items-center justify-between'>
          <Link to='/signup'>
            <p className='font-medium text-slate-800 text-xl'>Sell</p>
          </Link>

          <Link to='/login'>
            <button className='border-2 font-medium text-stone-800 border-stone-800 hover:bg-stone-800 hover:text-white rounded w-20 h-10 ml-20'>
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
