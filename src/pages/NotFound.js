import React from 'react';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return isMobile ? (
    <div className='h-screen flex flex-col items-center justify-center p-2'>
      <div className='border rounded p-4 shadow-lg flex flex-col items-center'>
        <p className='text-3xl text-stone-800'>Oops!</p>
        <p className='text-lg text-stone-800 mt-4'>404 - page not found</p>
        <p className='text-md text-stone-800 mt-4 text-center'>
          The page you are looking for is not available or does not exist.
        </p>
        <Link
          to='/'
          className='flex items-center justify-center border-2 rounded border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 w-32 h-10 mt-4'
        >
          Return Home
        </Link>
      </div>
    </div>
  ) : (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='border rounded p-4 shadow-lg flex flex-col items-center'>
        <p className='text-3xl text-stone-800'>Oops!</p>
        <p className='text-lg text-stone-800 mt-4'>404 - page not found</p>
        <p className='text-md text-stone-800 mt-4'>
          The page you are looking for is not available or does not exist.
        </p>
        <Link
          to='/'
          className='flex items-center justify-center border-2 rounded border-stone-800 text-stone-800 hover:text-white hover:bg-stone-800 w-32 h-10 mt-4'
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
