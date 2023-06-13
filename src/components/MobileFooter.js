import React from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineTwitter,
  AiOutlineFacebook,
  AiOutlineLinkedin,
} from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';
import { IoStorefrontOutline } from 'react-icons/io5';

const MobileFooter = () => {
  return (
    <footer className='w-full h-40 border-t-2 mt-10'>
      <div className='w-11/12 mx-auto h-full flex flex-col items-center justify-center'>
        <div className='flex justify-center items-center text-2xl'>
          <Link to='/' className='h-full flex justify-center items-center'>
            <IoStorefrontOutline className='text-gray-400 font-bold' />
            <p className='font-black text-gray-400 font-sans'>Fruntt</p>
          </Link>
        </div>

        <div className='flex w-20 justify-between text-2xl mt-4'>
          <a href='https://linkedin.com/company/fruntt' target='_blank'>
            <AiOutlineLinkedin className='text-gray-400 hover:text-slate-800' />
          </a>
          <a href='https://twitter.com/fruntt_' target='_blank'>
            <AiOutlineTwitter className='text-gray-400 hover:text-slate-800' />
          </a>
        </div>

        <div className='flex justify-between items-center w-10/12 mt-4 text-sm'>
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
      </div>
    </footer>
  );
};

export default MobileFooter;
