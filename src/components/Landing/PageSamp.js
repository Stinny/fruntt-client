import React from 'react';
import '../../App.css';
import { isMobile } from 'react-device-detect';

//mui
import Avatar from '@mui/material/Avatar';

const PageSamp = () => {
  return isMobile ? (
    <>
      <p className='font-medium mb-2 text-left mt-10'>
        &#123;YourPageName&#125;.fruntt.com
      </p>
      <div className='w-full h-full p-2 rounded bg-green-100 border-black border samp-bg drop-shadow-xl'>
        <div className='border-t border-b w-full h-16 border-black flex items-center'>
          <div className='w-2/12'>
            <Avatar>J</Avatar>
          </div>

          <div className='flex flex-col w-4/12'>
            <div className='flex'>
              <div className='w-6/12 h-2 bg-gray-200'></div>
              <div className='w-6/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-9/12 h-2 bg-gray-200'></div>
              <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-9/12 h-2 bg-gray-200'></div>
              <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
            </div>
          </div>

          <div className='flex flex-col items-center w-2/12'>
            <p className='font-medium'>78</p>
            <p className='font-medium text-xs'>Sales</p>
          </div>

          <div className='flex flex-col items-start w-4/12'>
            <p className='font-medium text-xs'>My other pages:</p>
            <select className='h-6 rounded bg-gray-200 w-full'></select>
          </div>
        </div>

        <div className='flex justify-between w-full mt-2'>
          <div className='w-6/12 bg-pink-100 rounded h-44 samp-item-bg'></div>

          <div className='flex flex-col w-6/12 ml-4'>
            <div className='flex'>
              <div className='w-6/12 h-4 bg-gray-200'></div>
              <div className='w-6/12 h-4 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-4'>
              <div className='w-9/12 h-2 bg-gray-200'></div>
              <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-4/12 h-2 bg-gray-200'></div>
              <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-5/12 h-2 bg-gray-200'></div>
              <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-10/12 h-2 bg-gray-200'></div>
              <div className='w-2/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-4/12 h-2 bg-gray-200'></div>
              <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex items-center mt-2'>
              <p className='w-7/12 font-semibold text-2xl'>$19.99</p>
              <p className='w-5/12 text-xs ml-4'>(12) reviews</p>
            </div>

            <button
              type='button'
              className='w-full bg-white text-black rounded h-6 text-sm mt-2 border border-stone-800'
            >
              BUY NOW
            </button>
          </div>
        </div>

        <p className='text-black text-sm mt-2 font-medium text-left'>
          About this product
        </p>
        <div className='bg-gray-300 h-24 w-full rounded p-2'>
          <div className='flex'>
            <div className='w-9/12 h-2 bg-gray-200'></div>
            <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-4/12 h-2 bg-gray-200'></div>
            <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-5/12 h-2 bg-gray-200'></div>
            <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-10/12 h-2 bg-gray-200'></div>
            <div className='w-2/12 h-2 bg-gray-200 ml-2'></div>
          </div>
        </div>

        <p className='text-black text-sm mt-2 font-medium text-left'>
          Customer questions
        </p>
        <div className='bg-gray-300 h-14 w-full rounded p-2'>
          <div className='flex'>
            <div className='w-9/12 h-2 bg-gray-200'></div>
            <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-4/12 h-2 bg-gray-200'></div>
            <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-5/12 h-2 bg-gray-200'></div>
            <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
          </div>
        </div>

        <p className='text-black text-sm mt-2 font-medium text-left'>
          Customer reviews (12)
        </p>
        <div className='bg-gray-300 h-14 w-full rounded p-2'>
          <div className='flex mt-2'>
            <div className='w-5/12 h-2 bg-gray-200'></div>
            <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-10/12 h-2 bg-gray-200'></div>
            <div className='w-2/12 h-2 bg-gray-200 ml-2'></div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <p className='font-medium ml-24 text-lg mb-2 text-left'>
        &#123;YourPageName&#125;.fruntt.com
      </p>
      <div className='w-10/12 h-full p-2 rounded bg-green-100 ml-32 border-black border samp-bg drop-shadow-xl'>
        <div className='border-t border-b w-full h-16 border-black flex items-center'>
          <div className='w-2/12'>
            <Avatar>J</Avatar>
          </div>

          <div className='flex flex-col w-44 ml-4 w-4/12'>
            <div className='flex'>
              <div className='w-6/12 h-2 bg-gray-200'></div>
              <div className='w-6/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-9/12 h-2 bg-gray-200'></div>
              <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-9/12 h-2 bg-gray-200'></div>
              <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
            </div>
          </div>

          <div className='flex flex-col items-center ml-2 w-3/12'>
            <p className='font-medium'>78</p>
            <p className='font-medium text-xs'>Sales</p>
          </div>

          <div className='flex flex-col ml-2 w-3/12'>
            <p className='font-medium text-xs'>My other pages:</p>
            <select className='h-6 rounded bg-gray-200'></select>
          </div>
        </div>

        <div className='flex justify-between w-full mt-2'>
          <div className='w-6/12 bg-pink-100 rounded h-44 samp-item-bg'></div>

          <div className='flex flex-col w-6/12 ml-4'>
            <div className='flex'>
              <div className='w-6/12 h-4 bg-gray-200'></div>
              <div className='w-6/12 h-4 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-4'>
              <div className='w-9/12 h-2 bg-gray-200'></div>
              <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-4/12 h-2 bg-gray-200'></div>
              <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-5/12 h-2 bg-gray-200'></div>
              <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-10/12 h-2 bg-gray-200'></div>
              <div className='w-2/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex mt-2'>
              <div className='w-4/12 h-2 bg-gray-200'></div>
              <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
            </div>

            <div className='flex items-center mt-2'>
              <p className='w-7/12 font-semibold text-2xl'>$19.99</p>
              <p className='w-5/12 text-sm ml-4'>(12) reviews</p>
            </div>

            <button
              type='button'
              className='w-full bg-white text-black rounded h-6 text-sm mt-2 border border-stone-800'
            >
              BUY NOW
            </button>
          </div>
        </div>

        <p className='text-black text-sm mt-2 font-medium'>
          About this product
        </p>
        <div className='bg-gray-300 h-28 w-full rounded p-2'>
          <div className='flex'>
            <div className='w-9/12 h-2 bg-gray-200'></div>
            <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-4/12 h-2 bg-gray-200'></div>
            <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-5/12 h-2 bg-gray-200'></div>
            <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-10/12 h-2 bg-gray-200'></div>
            <div className='w-2/12 h-2 bg-gray-200 ml-2'></div>
          </div>
        </div>

        <p className='text-black text-sm mt-2 font-medium'>
          Customer questions
        </p>
        <div className='bg-gray-300 h-24 w-full rounded p-2'>
          <div className='flex'>
            <div className='w-9/12 h-2 bg-gray-200'></div>
            <div className='w-3/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-4/12 h-2 bg-gray-200'></div>
            <div className='w-8/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-5/12 h-2 bg-gray-200'></div>
            <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
          </div>
        </div>

        <p className='text-black text-sm mt-2 font-medium'>
          Customer reviews (12)
        </p>
        <div className='bg-gray-300 h-20 w-full rounded p-2'>
          <div className='flex mt-2'>
            <div className='w-5/12 h-2 bg-gray-200'></div>
            <div className='w-7/12 h-2 bg-gray-200 ml-2'></div>
          </div>

          <div className='flex mt-2'>
            <div className='w-10/12 h-2 bg-gray-200'></div>
            <div className='w-2/12 h-2 bg-gray-200 ml-2'></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSamp;
