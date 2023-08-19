import React from 'react';
import { isMobile } from 'react-device-detect';

const Pricing = () => {
  return isMobile ? (
    <div className='w-full flex flex-col items-center mt-20 mb-20 p-2'>
      <p className='text-lg font-medium'>Pricing</p>

      <div className='rounded bg-white border drop-shadow-lg flex flex-col p-4 items-center mt-6 w-full'>
        <p className='font-semibold text-2xl'>1% flat fee</p>
        <p className='font-medium text-md'>After payment processing fees</p>
        <p className='mt-4 font-medium'>Processing fees: 2.9% + 30 cents</p>
        <p className='font-medium text-md mt-6 w-96 text-center'>
          Never pay us on a monthly basis, we get paid only when you do. We just
          take a mini cut of every sale.
        </p>
      </div>
    </div>
  ) : (
    <div className='w-full flex flex-col items-center mt-20 mb-20'>
      <p className='text-lg font-medium'>Pricing</p>

      <div className='rounded bg-white border drop-shadow-lg flex flex-col p-4 items-center mt-6'>
        <p className='font-semibold text-3xl'>1% flat fee</p>
        <p className='font-medium text-md'>After payment processing fees</p>
        <p className='mt-4 font-medium'>Processing fees: 2.9% + 30 cents</p>
        <p className='font-medium text-lg mt-6 w-96 text-center'>
          Never pay us on a monthly basis, we get paid only when you do. We just
          take a mini cut of every sale.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
