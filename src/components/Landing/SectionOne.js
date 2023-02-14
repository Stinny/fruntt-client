import React from 'react';
import img from '../../media/light.svg';
import { isMobile } from 'react-device-detect';

const SectionOne = () => {
  return isMobile ? (
    <div className='w-full flex flex-col p-2'>
      <div className='flex flex-col w-full'>
        <p className='text-2xl font-medium text-slate-800'>
          Offer physical or digital goods in minutes!
        </p>
        <p className='text-xl mt-2 font-medium text-gray-400'>
          Easily setup your product page to offer physical or digital goods.
          Sell anything from t-shirts to blog posts. Start by selling one
          product on your page and grow from there!
        </p>
      </div>
      <img src={img} className='w-full bg-gray-100 mt-2' />
    </div>
  ) : (
    <div className='max-w-7xl flex justify-between items-center'>
      <div className='flex flex-col w-3/6 pr-10'>
        <p className='text-4xl font-medium text-slate-800'>
          Offer physical or digital goods in minutes!
        </p>
        <p className='text-2xl mt-6 font-medium text-gray-400'>
          Easily setup your product page to offer physical or digital goods.
          Sell anything from t-shirts to blog posts. Start by selling one
          product on your page and grow from there!
        </p>
      </div>
      <img src={img} className='w-3/6 bg-gray-100' />
    </div>
  );
};

export default SectionOne;
