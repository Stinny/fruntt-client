import React from 'react';
import { IoStorefrontOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {
  AiOutlineTwitter,
  AiOutlineYoutube,
  AiOutlineFacebook,
} from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import MobileFooter from './MobileFooter';

const Footer = () => {
  return isMobile ? (
    <MobileFooter />
  ) : (
    <footer className='w-full h-40 border-t-2 mt-10'>
      <div className='max-w-7xl mx-auto h-full flex justify-between items-center'>
        <div className='h-full flex justify-center items-center text-4xl'>
          <Link to='/' className='h-full flex justify-center items-center'>
            <IoStorefrontOutline className='text-gray-400 font-bold' />
            <h2 className='font-black text-gray-400 font-sans'>Fruntt</h2>
          </Link>
        </div>

        <div className='flex justify-between items-center w-72'>
          <Link to='/' className='text-gray-400 hover:text-slate-800'>
            About
          </Link>
          <Link to='/' className='text-gray-400 hover:text-slate-800'>
            Contact
          </Link>
          <Link to='/' className='text-gray-400 hover:text-slate-800'>
            Privacy Policy
          </Link>
          <Link to='/' className='text-gray-400 hover:text-slate-800'>
            Terms
          </Link>
        </div>

        <div className='flex w-40 justify-between text-4xl'>
          <a href='https://discord.gg/6GHYR2xn' target='_blank'>
            <BsDiscord className='text-gray-400 hover:text-slate-800' />
          </a>
          <AiOutlineFacebook className='text-gray-400 hover:text-slate-800' />
          <a href='https://twitter.com/frunttecomm' target='_blank'>
            <AiOutlineTwitter className='text-gray-400 hover:text-slate-800' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
