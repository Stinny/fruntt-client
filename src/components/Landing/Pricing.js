import React from 'react';
import { isMobile } from 'react-device-detect';

const Pricing = () => {
  return isMobile ? (
    <div className='w-full flex flex-col items-center mt-44 mb-20' id='pricing'>
      <p className='text-lg font-medium'>Pricing</p>

      <div className='rounded bg-white border drop-shadow-lg flex flex-col p-6 items-center mt-6 w-full'>
        <p className='text-sm'>
          Sales under $10: <span className='font-bold'>$0.50/sale</span>
        </p>
        <p className='mt-2 text-sm text-stone-800'>OR</p>
        <p className='text-sm mt-2'>
          Sales $10 or more: <span className='font-bold'>$1.00/sale</span>
        </p>
        <p className='mt-2 text-sm text-stone-800'>+</p>

        <p className='mt-2 text-sm'>
          Processing fees:{' '}
          <span className='font-bold'>(2.9% + 30 cents)/sale</span>
        </p>
        <p className='font-medium text-sm mt-6 text-center'>
          Never pay us on a monthly basis, we get paid only when you do. We just
          take a mini cut of every sale.
        </p>
      </div>
    </div>
  ) : (
    <div className='w-full flex flex-col items-center mt-44 mb-20' id='pricing'>
      <p className='text-lg font-medium'>Pricing</p>

      <div className='rounded bg-white border drop-shadow-lg flex flex-col p-10 items-center mt-6'>
        <p className='text-md'>
          Sales under $10: <span className='font-bold'>$0.50/sale</span>
        </p>
        <p className='mt-2 text-sm text-stone-800'>OR</p>
        <p className='text-md mt-2'>
          Sales $10 or more: <span className='font-bold'>$1.00/sale</span>
        </p>
        <p className='mt-2 text-sm text-stone-800'>+</p>
        {/* <p className='font-medium text-sm'>After payment processing fees</p> */}
        <p className='mt-2 text-md'>
          Processing fees:{' '}
          <span className='font-bold'>(2.9% + 30 cents)/sale</span>
        </p>
        <p className='font-medium text-md mt-6 w-96 text-center'>
          Never pay us on a monthly basis, we get paid only when you do. We just
          take a mini cut of every sale.
        </p>
      </div>
    </div>
  );
};

export default Pricing;
