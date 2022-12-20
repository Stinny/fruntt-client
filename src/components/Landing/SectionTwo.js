import React from 'react';
import img from '../../media/mail.svg';
import { isMobile } from 'react-device-detect';

const SectionTwo = () => {
  return isMobile ? (
    <div className='max-w-7xl flex flex-col mx-auto p-2'>
      <div className='flex flex-col w-full'>
        <p className='text-2xl font-medium text-slate-800'>
          Thinking about how to deliver your product?
        </p>
        <p className='text-xl mt-2 font-medium text-gray-400'>
          Doesn’t matter if you sell physical or digital goods, we got you. Get
          shipping labels directly from us or have download links automatically
          sent to your customers after purchase.
        </p>
      </div>

      <img src={img} className='bg-gray-100 w-full mt-2' />
    </div>
  ) : (
    <div className='max-w-7xl flex justify-between items-center mx-auto'>
      <div className='w-3/6'>
        <img src={img} className='bg-gray-100' />
      </div>

      <div className='flex flex-col w-3/6 pl-10'>
        <p className='text-4xl font-medium text-slate-800'>
          Thinking about how to deliver your product?
        </p>
        <p className='text-2xl mt-6 font-medium text-gray-400'>
          Doesn’t matter if you sell physical or digital goods, we got you. Get
          shipping labels directly from us or have download links automatically
          sent to your customers after purchase.
        </p>
      </div>
    </div>
  );
};

export default SectionTwo;
