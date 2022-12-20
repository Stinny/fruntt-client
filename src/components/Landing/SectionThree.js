import React from 'react';
import img from '../../media/profile.svg';
import { isMobile } from 'react-device-detect';

const SectionThree = () => {
  return isMobile ? (
    <div className='max-w-7xl flex flex-col mx-auto p-2'>
      <div className='flex flex-col w-full'>
        <p className='text-2xl font-medium text-slate-800'>
          Gain your customers trust with your unique seller profile
        </p>
        <p className='text-xl mt-2 font-medium text-gray-400'>
          Your seller profile will be seen at the top of your product pages and
          allows customers to know exactly who they're buying from. Most
          importantly your seller profile links to your other pages!
        </p>
      </div>
      <img src={img} className='w-full bg-gray-100 mt-2' />
    </div>
  ) : (
    <div className='max-w-7xl flex justify-between items-center mx-auto'>
      <div className='flex flex-col w-3/6 pr-10'>
        <p className='text-4xl font-medium text-slate-800'>
          Gain your customers trust with your unique seller profile
        </p>
        <p className='text-2xl mt-6 font-medium text-gray-400'>
          Your seller profile will be seen at the top of your product pages and
          allows customers to know exactly who they're buying from. Most
          importantly your seller profile links to your other pages!
        </p>
      </div>
      <img src={img} className='w-3/6 bg-gray-100' />
    </div>
  );
};

export default SectionThree;
