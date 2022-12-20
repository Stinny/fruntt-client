import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';

const Hero = () => {
  return isMobile ? (
    <div className='flex flex-col w-11/12 text-center mt-20 h-screen relative'>
      <p className='text-3xl font-medium'>One page. One product.</p>
      <p className='text-xl font-medium mt-4 text-gray-400'>
        An eCommerce platform that understands simplicity
      </p>
      <p className='text-md mt-4 tracking-wider font-medium'>
        Easily launch, design, and manage product pages. Avoid the hassle of
        launching an entire storefront.
      </p>

      <Link to='/signup' className='flex justify-center mt-8'>
        <button className='rounded text-slate-800 w-10/12 h-10 text-lg border-slate-800 border-2 hover:bg-slate-800 hover:text-white flex items-center justify-center'>
          Launch a product page - for FREE
        </button>
      </Link>
      <div className='absolute bottom-64 w-full mx-auto flex flex-col items-center text-gray-500 text-xl'>
        <p>Keep scrolling</p>
        <BsChevronDoubleDown />
      </div>
    </div>
  ) : (
    <div className='flex flex-col w-6/12 text-center mt-40 h-screen relative'>
      <p className='text-5xl font-medium'>One page. One product.</p>
      <p className='text-3xl font-medium mt-8 text-gray-400'>
        An eCommerce platform that understands simplicity
      </p>
      <p className='text-2xl mt-8 tracking-wider font-medium'>
        Easily launch, design, and manage product pages. Avoid the hassle of
        launching an entire storefront.
      </p>
      <Link to='/signup' className='flex justify-center mt-8'>
        <button className='rounded text-slate-800 w-96 h-10 text-xl mt-4 border-slate-800 border-2 hover:bg-slate-800 hover:text-white flex items-center justify-center'>
          Launch a product page - for FREE
        </button>
      </Link>

      <div className='absolute bottom-64 w-full mx-auto flex flex-col items-center text-gray-500 text-xl'>
        <p>Keep scrolling</p>
        <BsChevronDoubleDown />
      </div>
    </div>
  );
};

export default Hero;
