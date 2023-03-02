import React from 'react';
import { isMobile } from 'react-device-detect';

const Fee = () => {
  return isMobile ? (
    <div className='flex flex-col items-center mt-32 mb-32'>
      <p className='font-medium text-gray-400 text-2xl underline underline-offset-8'>
        Pricing
      </p>

      <p className='font-semibold text-4xl mt-8'>1% flat fee</p>
      <p className='font-medium text-md'>After payment processing fees</p>
      <p className='font-medium text-lg mt-4 w-11/12 text-center'>
        Never pay us on a monthly basis, we get paid only when you do. We just
        take a mini cut of every sale.
      </p>
    </div>
  ) : (
    <div className='flex flex-col items-center mt-32 mb-32'>
      <p className='font-medium text-gray-400 text-2xl underline underline-offset-8'>
        Pricing
      </p>

      <p className='font-semibold text-5xl mt-8'>1% flat fee</p>
      <p className='font-medium text-md'>After payment processing fees</p>
      <p className='font-medium text-xl mt-4 w-7/12 text-center'>
        Never pay us on a monthly basis, we get paid only when you do. We just
        take a mini cut of every sale.
      </p>
    </div>
  );
};

export default Fee;
