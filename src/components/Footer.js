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
import Cookies from 'js-cookie';

const Footer = () => {
  const currentUser = Cookies.get('currentUser')
    ? JSON.parse(Cookies.get('currentUser'))
    : null;

  return isMobile ? (
    <MobileFooter />
  ) : (
    <footer className='w-full h-16 border-t border-gray-200 flex'>
      {currentUser ? (
        <div className='w-full mx-auto h-full flex justify-between items-center pl-4 pr-4'>
          <div className='h-full flex justify-center items-center text-2xl'>
            <Link to='/' className='h-full flex justify-center items-center'>
              <IoStorefrontOutline className='text-gray-400 font-bold' />
              <p
                className='font-black text-gray-400'
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Fruntt
              </p>
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
      ) : (
        <div className='w-full h-full'>
          <div className='max-w-6xl mx-auto h-full flex justify-between items-center'>
            <div className='h-full flex justify-center items-center text-2xl'>
              <Link to='/' className='h-full flex justify-center items-center'>
                <IoStorefrontOutline className='text-gray-400 font-bold' />
                <p
                  className='font-black text-gray-400 mt-1'
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Fruntt
                </p>
              </Link>
            </div>

            <div className='flex justify-between items-center w-72'>
              {/* <Link to='/' className='text-gray-400 hover:text-slate-800'>
            About
          </Link> */}
              <Link
                to='/contact'
                className='text-gray-400 hover:text-slate-800 text-sm'
              >
                Contact
              </Link>
              <Link
                to='/privacy'
                className='text-gray-400 hover:text-slate-800 text-sm'
              >
                Privacy
              </Link>
              <Link
                to='/tos'
                className='text-gray-400 hover:text-slate-800 text-sm'
              >
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
        </div>
      )}
    </footer>
  );
};

export default Footer;
