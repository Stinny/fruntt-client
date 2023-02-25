import React from 'react';
import { Link } from 'react-router-dom';
import { BsChevronDoubleDown } from 'react-icons/bs';
import { isMobile } from 'react-device-detect';
import PageSamp from './PageSamp';

const Hero = () => {
  return isMobile ? (
    <div className='flex flex-col w-11/12 text-center mt-20 h-screen'>
      <div className='flex flex-col w-full'>
        <p className='text-3xl font-medium'>
          Bring your digital products to LIFE.
        </p>
        <p className='text-xl font-medium mt-8 text-gray-400'>
          Your own customized pages to sell your digital products from.{' '}
          <span className='font-semibold'>Only pay 1% of what you sell.</span>
        </p>

        <Link to='/signup' className='flex mt-8'>
          <button className='rounded text-slate-800 w-96 h-10 text-xl mt-4 border-slate-800 border-2 hover:bg-slate-800 hover:text-white flex items-center justify-center'>
            Launch a page - for FREE
          </button>
        </Link>
      </div>

      <div className='w-full h-4/6'>
        <PageSamp />
      </div>
    </div>
  ) : (
    <div className='flex items-center justify-between h-screen w-8/12'>
      <div className='flex flex-col w-6/12'>
        <p className='text-5xl font-medium'>
          Bring your digital products to LIFE.
        </p>
        <p className='text-2xl font-medium mt-8 text-gray-400'>
          Your own customized pages to sell your digital products from.{' '}
          <span className='font-semibold'>Only pay 1% of what you sell.</span>
        </p>

        <Link to='/signup' className='flex mt-8'>
          <button className='rounded text-slate-800 w-96 h-10 text-xl mt-4 border-slate-800 border-2 hover:bg-slate-800 hover:text-white flex items-center justify-center'>
            Launch a page - for FREE
          </button>
        </Link>
      </div>

      <div className='w-6/12 h-4/6 flex flex-col items-end'>
        <PageSamp />
      </div>
    </div>
  );
};

export default Hero;
