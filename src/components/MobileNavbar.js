import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { IoStorefrontOutline } from 'react-icons/io5';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { HiMenu } from 'react-icons/hi';
import { BsDiscord } from 'react-icons/bs';

const MobileNavbar = ({ currentUser }) => {
  const [menuW, setW] = useState('w-0');
  const [menuH, setH] = useState('h-0');
  const [menuDisplay, setDisplay] = useState('none');
  const [opacity, setOpactity] = useState('opacity-0');

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
    <nav className='w-full h-16 border-b-2'></nav>
  ) : (
    <>
      <nav className='w-full h-16 border-b-2 fixed bg-white'>
        <div className='w-11/12 h-full mx-auto flex justify-between items-center'>
          <div className='text-4xl h-full flex justify-center items-center'>
            <Link to='/' className='h-full flex justify-center items-center'>
              <IoStorefrontOutline className='text-slate-800 font-bold' />
              <h2 className='font-black font-sans'>Fruntt</h2>
            </Link>
          </div>

          <div className='flex items-center h-full'>
            <HiMenu className='text-2xl font-black' onClick={openMenu} />
          </div>
        </div>
      </nav>
      <div
        className={`fixed z-90 ${menuW} ${menuH} bg-white`}
        style={{ display: menuDisplay }}
      >
        <button className='text-red-400 font-medium absolute top-0 right-0 mr-4 mt-4'>
          <AiOutlineCloseCircle className='text-3xl' onClick={closeMenu} />
        </button>

        <div className='flex flex-col w-full h-full mx-auto items-center'>
          <Link to='/pricing' className='text-2xl font-medium mt-20 border-b-2'>
            About
          </Link>
          <Link to='/pricing' className='text-2xl font-medium mt-20 border-b-2'>
            Pricing
          </Link>
          <Link to='/signup' className='text-2xl font-medium mt-20 border-b-2'>
            Launch a storefront
          </Link>
          <a
            href='https://discord.gg/6GHYR2xn'
            target='_blank'
            className='font-medium'
            style={{ color: '#738adb' }}
            className='mt-20'
          >
            <BsDiscord className='text-4xl border-b-2' />
          </a>

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
