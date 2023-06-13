import React from 'react';
import { IoStorefrontOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineFacebook,
} from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import MobileFooter from './MobileFooter';

const Footer = () => {
  return isMobile ? (
    <MobileFooter />
  ) : (
    <footer className='w-full h-32 border-t-2 mt-10'>
      <div className='max-w-7xl mx-auto h-full flex justify-between items-center'>
        <div className='h-full flex justify-center items-center text-2xl'>
          <Link to='/' className='h-full flex justify-center items-center'>
            <IoStorefrontOutline className='text-gray-400 font-bold' />
            <p className='font-black text-gray-400 font-sans'>Fruntt</p>
          </Link>
        </div>

        <div className='flex justify-between items-center w-72'>
          {/* <Link to='/' className='text-gray-400 hover:text-slate-800'>
            About
          </Link> */}
          <Link to='/' className='text-gray-400 hover:text-slate-800'>
            Contact
          </Link>
          <Link to='/privacy' className='text-gray-400 hover:text-slate-800'>
            Privacy
          </Link>
          <Link to='/tos' className='text-gray-400 hover:text-slate-800'>
            Terms
          </Link>
        </div>

        <div className='flex w-24 justify-between text-4xl'>
          <a href='https://linkedin.com/company/fruntt' target='_blank'>
            <AiOutlineLinkedin className='text-gray-400 hover:text-slate-800' />
          </a>

          <a href='https://twitter.com/fruntt_' target='_blank'>
            <AiOutlineTwitter className='text-gray-400 hover:text-slate-800' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
