import React from 'react';
import { isMobile } from 'react-device-detect';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BsStripe } from 'react-icons/bs';

const Pricing = () => {
  return isMobile ? (
    <div className='w-full flex flex-col items-center mt-44 mb-20' id='pricing'>
      <p className='text-lg font-medium'>Pricing</p>

      {/* <div className='rounded bg-white border drop-shadow-lg flex flex-col p-6 items-center mt-6 w-full'>
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
      </div> */}

      <div className='flex flex-col w-96 mt-6'>
        <div className='w-full h-10 bg-white drop-shadow-lg rounded flex items-center justify-center'>
          <p className='text-stone-800 text-sm text-center'>
            Pay only $1 or 50¢ / sale
          </p>
        </div>

        <div className='flex justify-between w-full h-44 mt-2'>
          <div className='flex flex-col w-3/6 mr-2'>
            <div className='bg-white drop-shadow-lg rounded border w-full h-2/6 flex justify-center items-center'>
              <p className='text-stone-800 text-sm'>Sales under $10</p>
              <IoIosArrowDown className='ml-2 text-xl' />
            </div>
            <div className='bg-white drop-shadow-lg rounded border w-full h-4/6 mt-2 flex items-center justify-center'>
              <div className='flex flex-col'>
                <p className='text-xs text-gray-400 text-left'>Total:</p>
                <p className='text-3xl text-stone-800 text-left mt-1'>$8</p>
                <p className='text-sm text-stone-800 mt-1'>You pay us 50¢</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-3/6'>
            <div className='bg-white drop-shadow-lg rounded border w-full h-4/6 flex justify-center items-center'>
              <div className='flex flex-col'>
                <p className='text-xs text-gray-400 text-left'>Total:</p>
                <p className='text-3xl text-stone-800 text-left mt-1'>$56</p>
                <p className='text-sm text-stone-800 mt-1'>You pay us $1</p>
              </div>
            </div>
            <div className='bg-white drop-shadow-lg rounded border w-full h-2/6 mt-2 flex items-center justify-center'>
              <p className='text-stone-800 text-sm'>Sales $10 or more</p>
              <IoIosArrowUp className='ml-2 text-xl' />
            </div>
          </div>
        </div>

        <div className='w-full h-10 bg-white drop-shadow-lg border rounded flex items-center justify-center mt-2'>
          <p className='text-sm text-stone-800 flex items-center'>
            and (2.9% + 30 ¢) / sale goes to{' '}
            <span style={{ color: '#635bff' }}>
              <a href='https://stripe.com' target='_blank'>
                <BsStripe className='text-xl ml-1' />
              </a>
            </span>{' '}
          </p>
        </div>

        <div className='w-full h-24 bg-white drop-shadow-lg border rounded flex items-center justify-center mt-2 p-2'>
          <p className='text-stone-800 text-sm text-center'>
            Never pay us on a monthly basis, we get paid only when you do. We
            just take a mini cut of every sale.
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className='w-full flex flex-col items-center mt-44 mb-20' id='pricing'>
      <p className='text-lg font-medium'>Pricing</p>

      {/* <div className='rounded bg-white border drop-shadow-lg flex flex-col p-10 items-center mt-6'>
        <p className='text-md'>
          Sales under $10: <span className='font-bold'>$0.50/sale</span>
        </p>
        <p className='mt-2 text-sm text-stone-800'>OR</p>
        <p className='text-md mt-2'>
          Sales $10 or more: <span className='font-bold'>$1.00/sale</span>
        </p>
        <p className='mt-2 text-sm text-stone-800'>+</p>
        <p className='font-medium text-sm'>After payment processing fees</p>
        <p className='mt-2 text-md'>
          Processing fees:{' '}
          <span className='font-bold'>(2.9% + 30 cents)/sale</span>
        </p>
        <p className='font-medium text-md mt-6 w-96 text-center'>
          Never pay us on a monthly basis, we get paid only when you do. We just
          take a mini cut of every sale.
        </p>
      </div> */}

      <div className='flex flex-col w-96 mt-6'>
        <div className='w-full h-10 bg-white drop-shadow-lg rounded flex items-center justify-center'>
          <p className='text-stone-800 text-sm text-center'>
            Pay only $1 or 50¢ / sale
          </p>
        </div>

        <div className='flex justify-between w-full h-44 mt-2'>
          <div className='flex flex-col w-3/6 mr-2'>
            <div className='bg-white drop-shadow-lg rounded border w-full h-2/6 flex justify-center items-center'>
              <p className='text-stone-800 text-sm'>Sales under $10</p>
              <IoIosArrowDown className='ml-2 text-xl' />
            </div>
            <div className='bg-white drop-shadow-lg rounded border w-full h-4/6 mt-2 flex items-center justify-center'>
              <div className='flex flex-col'>
                <p className='text-xs text-gray-400 text-left'>Total:</p>
                <p className='text-3xl text-stone-800 text-left mt-1'>$8</p>
                <p className='text-sm text-stone-800 mt-1'>You pay us 50¢</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-3/6'>
            <div className='bg-white drop-shadow-lg rounded border w-full h-4/6 flex justify-center items-center'>
              <div className='flex flex-col'>
                <p className='text-xs text-gray-400 text-left'>Total:</p>
                <p className='text-3xl text-stone-800 text-left mt-1'>$56</p>
                <p className='text-sm text-stone-800 mt-1'>You pay us $1</p>
              </div>
            </div>
            <div className='bg-white drop-shadow-lg rounded border w-full h-2/6 mt-2 flex items-center justify-center'>
              <p className='text-stone-800 text-sm'>Sales $10 or more</p>
              <IoIosArrowUp className='ml-2 text-xl' />
            </div>
          </div>
        </div>

        <div className='w-full h-10 bg-white drop-shadow-lg border rounded flex items-center justify-center mt-2'>
          <p className='text-sm text-stone-800 flex items-center'>
            and (2.9% + 30 ¢) / sale goes to{' '}
            <span style={{ color: '#635bff' }}>
              <a href='https://stripe.com' target='_blank'>
                <BsStripe className='text-xl ml-1' />
              </a>
            </span>{' '}
          </p>
        </div>

        <div className='w-full h-24 bg-white drop-shadow-lg border rounded flex items-center justify-center mt-2 p-2'>
          <p className='text-stone-800 text-sm text-center'>
            Never pay us on a monthly basis, we get paid only when you do. We
            just take a mini cut of every sale.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
