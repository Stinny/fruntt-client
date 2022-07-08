import React from 'react';
import { IoStorefrontOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import {
  AiOutlineInstagram,
  AiOutlineYoutube,
  AiOutlineFacebook,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className='w-full h-40 border-t-2 mt-10'>
      <div className='max-w-7xl mx-auto h-full flex justify-between items-center'>
        <div className='h-full flex justify-center items-center text-4xl'>
          <Link to='/' className='h-full flex justify-center items-center'>
            <IoStorefrontOutline className='text-gray-400 font-bold' />
            <h2 className='font-black text-gray-400 font-sans'>Fruntt</h2>
          </Link>
        </div>

        <div className='flex justify-between items-center w-72'>
          <Link to='/' className='text-gray-400 hover:text-blue-400'>
            About
          </Link>
          <Link to='/' className='text-gray-400 hover:text-blue-400'>
            Contact
          </Link>
          <Link to='/' className='text-gray-400 hover:text-blue-400'>
            Privacy Policy
          </Link>
          <Link to='/' className='text-gray-400 hover:text-blue-400'>
            Terms
          </Link>
        </div>

        <div className='flex w-40 justify-between text-4xl'>
          <AiOutlineFacebook className='text-gray-400 hover:text-blue-400' />
          <AiOutlineInstagram className='text-gray-400 hover:text-blue-400' />
          <AiOutlineYoutube className='text-gray-400 hover:text-blue-400' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
