import React from 'react';
import { Link } from 'react-router-dom';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
} from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';
import { IoStorefrontOutline } from 'react-icons/io5';

const MobileFooter = () => {
  return (
    <footer className='w-full h-40 border-t-2 mt-10'>
      <div className='w-11/12 mx-auto h-full flex flex-col items-center justify-center'>
        <div className='flex justify-center items-center text-3xl'>
          <Link to='/' className='h-full flex justify-center items-center'>
            <IoStorefrontOutline className='text-gray-400 font-bold' />
            <h2 className='font-black text-gray-400 font-sans'>Fruntt</h2>
          </Link>
        </div>

        <div className='flex w-40 justify-between text-3xl mt-4'>
          <a href='https://discord.gg/6GHYR2xn' target='_blank'>
            <BsDiscord className='text-gray-400 hover:text-slate-800' />
          </a>
          <AiOutlineFacebook className='text-gray-400 hover:text-slate-800' />
          <AiOutlineYoutube className='text-gray-400 hover:text-slate-800' />
        </div>

        <div className='flex justify-between items-center w-10/12 mt-4'>
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
      </div>
    </footer>
  );
};

export default MobileFooter;
