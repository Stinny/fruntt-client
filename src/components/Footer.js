import React from 'react';
import { IoStorefrontOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {
  AiOutlineTwitter,
  AiOutlineLinkedin,
  AiOutlineFacebook,
} from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';
import { FaXTwitter } from 'react-icons/fa6';
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
    <footer className='w-full h-16 flex mt-10'>
      {currentUser ? (
        <div className='w-full mx-auto'>
          <div className='max-w-6xl mx-auto h-full flex justify-between items-center'>
            <div className='h-full flex justify-center items-center'>
              <Link to='/' className='h-full flex justify-center items-center'>
                <IoStorefrontOutline className='text-stone-800 text-xl font-bold' />
                <p
                  className='text-md text-stone-800 mt-2 font-black'
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
              <Link to='/' className='text-stone-800 text-sm'>
                Contact
              </Link>
              <Link to='/privacy' className='text-stone-800 text-sm'>
                Privacy
              </Link>
              <Link to='/tos' className='text-stone-800 text-sm'>
                Terms
              </Link>
            </div>

            <div className='flex w-16 justify-between text-4xl'>
              <a href='https://linkedin.com/company/fruntt' target='_blank'>
                <AiOutlineLinkedin className='text-xl text-stone-800' />
              </a>

              <a href='https://twitter.com/fruntt_' target='_blank'>
                <FaXTwitter className='text-xl text-stone-800' />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full h-full'>
          <div className='max-w-6xl mx-auto h-full flex justify-between items-center'>
            <div className='h-full flex justify-center items-center'>
              <Link to='/' className='h-full flex justify-center items-center'>
                <IoStorefrontOutline className='text-stone-800 font-bold text-xl' />
                <p
                  className='text-stone-800 font-black text-md mt-1'
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
              <Link to='/contact' className='text-stone-800 text-sm'>
                Contact
              </Link>
              <Link to='/privacy' className='text-stone-800 text-sm'>
                Privacy
              </Link>
              <Link to='/tos' className='text-stone-800 text-sm'>
                Terms
              </Link>
            </div>

            <div className='flex w-16 justify-between text-4xl'>
              <a href='https://linkedin.com/company/fruntt' target='_blank'>
                <AiOutlineLinkedin className='text-xl text-stone-800' />
              </a>

              <a href='https://twitter.com/fruntt_' target='_blank'>
                <FaXTwitter className='text-xl text-stone-800' />
              </a>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
